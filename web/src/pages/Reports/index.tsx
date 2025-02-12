import React, { useState } from "react";
import MainLayout from "../../layouts/mainLayouts/mainLayouts";
import Card from "../../components/cards/Card";
import { FaFileExcel, FaClipboardCheck } from "react-icons/fa";
import axios from "axios";
// import { useGenerateInventoryReportMutation, useCreateInventoryClosureMutation } from "../../domain/graphql";

const ReportPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadReport = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_GRAPH}products/export-excel`, {
        responseType: "blob", // Recibir el archivo como blob
      });

      // Crear un enlace para la descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Inventario_${new Date().toISOString().split("T")[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError("Error al descargar el archivo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-700">Reportes de Inventario</h1>

        {/* Card para generar reporte de inventario */}
        {/* <Card className="w-full flex flex-col items-start p-4">
          <div className="flex justify-between w-full items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Generar Reporte de Inventario</h2>
              <p className="text-sm text-gray-500">Seleccione un rango de fechas y genere un reporte de inventario.</p>
            </div>
            <FaFileExcel className="text-4xl text-green-500" />
          </div>
          <div className="mt-4 flex gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Fecha de Inicio:</label>
              <input
                type="date"
                className="border p-2 rounded"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Fecha de Fin:</label>
              <input
                type="date"
                className="border p-2 rounded"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={handleGenerateReport}
            // disabled={reportLoading}
          >
            {reportLoading ? "Generando..." : "Generar Reporte"}
          </button>
        </Card> */}

        {/* Card para realizar cierre de inventario */}
        <Card className="w-full flex flex-col items-start p-4">
          <div className="flex justify-between w-full items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Cierre de Inventario</h2>
              <p className="text-sm text-gray-500">Realice un cierre de inventario con la fecha actual.</p>
            </div>
            <FaClipboardCheck className="text-4xl text-red-500" />
          </div>

          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={downloadReport}
            disabled={loading}
          >
            {loading ? "Generando..." : "Descargar Reporte"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </Card>
      </div>
    </MainLayout>
  );
};

export default ReportPage;
