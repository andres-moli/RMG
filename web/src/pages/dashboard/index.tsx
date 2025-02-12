import React, { useState, useEffect } from "react";
import Card from "../../components/cards/Card";
import MainLayout from "../../layouts/mainLayouts/mainLayouts";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaClipboardList, FaChartLine, FaRegCalendarAlt, FaChartBar } from "react-icons/fa";
import { useGetReportQuery } from "../../domain/graphql";
import SkeletonDashboard from "../../components/esqueleto/dashboard";
import { formatCurrency } from "../../lib/utils";
import { GrDocument } from "react-icons/gr";
import { BiRefresh } from "react-icons/bi";
import { toast } from "sonner";

// Registrar elementos de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const DashboardPage: React.FC = () => {
  // Función para obtener la fecha de inicio y fin del mes actual
  const getMonthRange = () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0];
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split("T")[0];
    return { firstDay, lastDay };
  };

  // Estados para fechas
  const [startDate, setStartDate] = useState(getMonthRange().firstDay);
  const [endDate, setEndDate] = useState(getMonthRange().lastDay);

  // Consulta GraphQL con fechas seleccionadas
  const { data, loading, error, refetch } = useGetReportQuery({
    variables: { dateRange: { startDate, endDate } },
  });

  // Refrescar datos cuando cambian las fechas
  useEffect(() => {
    refetch();
  }, [startDate, endDate, refetch]);


  const { getOrdersByDateRange, getBalanceByDateRange, getGastosByDateRange, getProductByDateRange, getServiceByDateRange } = data || {};

  // Calcular totales
  const totalOrders = getOrdersByDateRange?.filter((status) => status.status != 'SIN_RECIBO')?.reduce((acc: any, item: any) => acc + item.total_por_estado, 0) || 0;
  const totalGastos = getBalanceByDateRange?.total_gasto || 0;
  const totalIngresos = getBalanceByDateRange?.total_recaudado || 0;
  const saldo = getBalanceByDateRange?.saldo || 0;

  // Datos para gráficos
  const gastosChartData = {
    labels: getGastosByDateRange?.map((g: any) => `${g.day}/${g.month}/${g.year}`) || [],
    datasets: [{ label: "Gastos", data: getGastosByDateRange?.map((g: any) => g.total) || [], backgroundColor: "rgba(255, 99, 132, 0.5)", borderColor: "rgba(255, 99, 132, 1)", borderWidth: 1 }],
  };

// Unificar fechas de productos y servicios, asegurando que no haya duplicados
const allDatesSet = new Set([
  ...(getProductByDateRange?.map((p: any) => `${p.day}/${p.month}/${p.year}`) || []),
  ...(getServiceByDateRange?.map((s: any) => `${s.day}/${s.month}/${s.year}`) || [])
]);

// Convertir Set a Array y ordenarlo por fecha
const allDates = Array.from(allDatesSet).sort((a, b) => {
  const [dayA, monthA, yearA] = a.split("/").map(Number);
  const [dayB, monthB, yearB] = b.split("/").map(Number);
  return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
});

const ingresosChartData = {
  labels: allDates, // Asegura que todas las fechas estén en el eje X
  datasets: [
    {
      label: "Productos",
      data: allDates.map(date => {
        const product = getProductByDateRange?.find((p: any) => `${p.day}/${p.month}/${p.year}` === date);
        return product ? product.total : 0; // Si no hay datos, poner 0
      }),
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
    {
      label: "Servicios",
      data: allDates.map(date => {
        const service = getServiceByDateRange?.find((s: any) => `${s.day}/${s.month}/${s.year}` === date);
        return service ? service.total : 0; // Si no hay datos, poner 0
      }),
      backgroundColor: "rgba(75, 192, 192, 0.5)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

  // Diccionario de traducción y colores por estado
  const statusConfig: any = {
    PENDING: { label: "Pendiente", color: "text-yellow-500", icon: <FaRegCalendarAlt className="text-4xl text-yellow-500" /> },
    COMPLETED: { label: "Completadas", color: "text-green-500", icon: <FaChartLine className="text-4xl text-green-500" /> },
    CANCELED: { label: "Canceladas", color: "text-red-500", icon: <FaChartBar className="text-4xl text-red-500" /> },
    SIN_RECIBO: { label: "Sin recibo", color: "text-orange-500", icon: <GrDocument className="text-4xl text-red-500" /> },
  };
  const onRefesh = async () => {
    const toastid = toast.loading('Actualizando...')
    await refetch()
    toast.dismiss(toastid)
  }
  return (
    <MainLayout>
      {
        loading
        ?
        <>
          <SkeletonDashboard/>
        </>
        :
        <div className="space-y-4">
        {/* Filtros de Fecha */}
        <div className="flex space-x-4 mb-4">
          <div>
            <label className="text-gray-700 font-semibold">Fecha Inicio:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border rounded p-2 w-full" />
          </div>
          <div>
            <label className="text-gray-700 font-semibold">Fecha Fin:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border rounded p-2 w-full" />
          </div>
          <button className="p-4 bg-gray-200 rounded-lg hover:bg-gray-300" onClick={() => onRefesh()}>
            <BiRefresh className="text-3xl" />
          </button>
        </div>

        {/* Tarjetas de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="w-full flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Órdenes</h2>
              <p className="text-xl font-bold">{totalOrders}</p>
            </div>
            <FaClipboardList className="text-4xl text-blue-500" />
          </Card>

          <Card className="w-full flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Ingresos</h2>
              <p className="text-xl font-bold">{formatCurrency(totalIngresos)}</p>
            </div>
            <FaChartLine className="text-4xl text-green-500" />
          </Card>

          <Card className="w-full flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Gastos</h2>
              <p className="text-xl font-bold">{formatCurrency(totalGastos)}</p>
            </div>
            <FaRegCalendarAlt className="text-4xl text-red-500" />
          </Card>

          <Card className="w-full flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Saldo Neto</h2>
              <p className="text-xl font-bold">{formatCurrency(saldo)}</p>
            </div>
            <FaChartBar className="text-4xl text-purple-500" />
          </Card>
        </div>
        {/* Tarjetas de métricas por estado */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {getOrdersByDateRange?.map((order: any, index: number) => {
            const config = statusConfig[order.status] || { label: order.status, color: "text-gray-500", icon: <FaClipboardList className="text-4xl text-gray-500" /> };

            return (
              <Card key={index} className="w-full flex items-center justify-between">
                <div>
                  <h2 className={`text-lg font-semibold ${config.color}`}>{config.label}</h2>
                  <p className="text-xl font-bold">{order.total_por_estado}</p>
                </div>
                {config.icon}
              </Card>
            );
          })}
        </div>

        {/* Gráficos */}
        <Card className="w-full p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Ingresos por Productos y Servicios</h2>
          <Bar data={ingresosChartData} />
        </Card>

        <Card className="w-full p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Gastos por Día</h2>
          <Line data={gastosChartData} />
        </Card>
      </div>
      }
    </MainLayout>
  );
};

export default DashboardPage;
