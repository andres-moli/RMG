import React, { useState } from "react";
import { Cotizacion, CotizacionStatusEmun, OrderTypes, PaymentMethodEnum, Products, RepairType, StatusInvoice, useClientsQuery, useCreateCotizacionMutation, useCreateProductOutflowMutation, useOrderRepairsTypeQuery, useProductsQuery, useUpdateCotizacionMutation } from "../../../../domain/graphql";
import { toast } from "sonner";
import { formatCurrency, ToastyErrorGraph } from "../../../../lib/utils";
import { apolloClient } from "../../../../main.config";
import { PiPlus } from "react-icons/pi";
import { BiTrash } from "react-icons/bi";
import SearchableSelect from "../../../../components/SelectFind/selectFind";

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  cotizacion: Cotizacion | undefined;
}

const UpdateModalCotizacionOut: React.FC<UpdateModalProps> = ({ isOpen, onClose, cotizacion }) => {
  if(!cotizacion) return
  const [update] = useUpdateCotizacionMutation()
  const calculateTotal = () => {
    const totalProducto = cotizacion.cotizacionProduct?.reduce((total, item) => total + item.total, 0) || 0;
    const totalServicio = cotizacion.cotizacionService?.reduce((total, item) => total + item.total, 0) || 0;
    return totalProducto + totalServicio
  };

  const handleSubmit = async (status: CotizacionStatusEmun) => {
    const toastId = toast.loading("Actualizando cotización...");
    try {
      const resMutation = await update({
        variables: {
          updateInput: {
            id: cotizacion.id,
            status
          }
        }
      })

      if (resMutation.errors) {
        toast.error("¡Oops, hubo un error!");
        return;
      }

      apolloClient.cache.evict({ fieldName: "Cotizaciones" });
      toast.success("Cotización creada con éxito");
    } catch (error) {
      ToastyErrorGraph(error as any);
    } finally {
      toast.dismiss(toastId);
    }
    onClose(); // Cerrar el modal después de enviar
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[90%] shadow-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Cotización de productos o servicios</h2>
          {/* Selector de cliente */}
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Información del Cliente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre completo */}
              <div>
                <label htmlFor="nameClient" className="block text-sm font-medium text-gray-700">
                  Nombre completo
                </label>
                <input
                  id="nameClient"
                  value={`${cotizacion.client.name} ${cotizacion.client.lastName}`}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
                />
              </div>

              {/* Celular */}
              <div>
                <label htmlFor="celularClient" className="block text-sm font-medium text-gray-700">
                  Celular
                </label>
                <input
                  id="celularClient"
                  value={cotizacion.client.celular}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
                />
              </div>

              {/* Correo electrónico */}
              <div>
                <label htmlFor="emailClient" className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  id="emailClient"
                  value={cotizacion.client.email}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
                />
              </div>

              {/* Dirección */}
              <div>
                <label htmlFor="addressClient" className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  id="addressClient"
                  value={cotizacion.client.address}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
                />
              </div>
            </div>
          </div>
          {/* Descripción */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
            <textarea
              id="description"
              value={cotizacion.description}
              disabled
              rows={4}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Agregar Producto o Servicio */}
          <div className="mt-4">
            {/* Mostrar tabla de productos o servicios según selección */}
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Producto o servicio</th>
                  <th>Cantidad</th>
                  <th>Precio und</th>
                  <th>Descuento (%)</th>
                  <th>Impuesto (%)</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cotizacion.cotizacionProduct?.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="w-1/8">
                      Producto
                    </td>
                    <td className="w-1/3">
                      {item.product.name}
                    </td>
                    <td className="w-1/12">
                      {item.quantity}
                    </td>
                    <td className="w-1/12">
                      {item.unitPrice}
                    </td>
                    <td className="w-1/12">
                      {item.discount}
                    </td>
                    <td className="w-1/12">
                      {item.tax}
                    </td>
                    <td className="w-1/6 p-1 text-right">
                      {item.total}
                    </td>
                  </tr>
                ))}
                {cotizacion.cotizacionService?.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="w-1/8">
                      Servicio
                    </td>
                    <td className="w-1/3">
                      {item.service.name}
                    </td>
                    <td className="w-1/12">
                      {item.quantity}
                    </td>
                    <td className="w-1/12">
                      {item.unitPrice}
                    </td>
                    <td className="w-1/12">
                      {item.discount}
                    </td>
                    <td className="w-1/12">
                      {item.tax}
                    </td>
                    <td className="w-1/6 p-1 text-right">
                      {item.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-4 text-lg font-semibold">
            Total: {formatCurrency(calculateTotal())}
          </h3>
          {
            cotizacion.status === CotizacionStatusEmun.Realizada
            && 
            (
              <div className="mt-4 flex justify-between">
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={()=> handleSubmit(CotizacionStatusEmun.Cancelada)}
              >
                Cancelar cotización
              </button>
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={()=> handleSubmit(CotizacionStatusEmun.Aprobada)}
              >
                Aprobar cotización
              </button>
              <button
                type="button"
                className="bg-orange-500 text-white px-4 py-2 rounded-md"
                onClick={()=> handleSubmit(CotizacionStatusEmun.Rechazada)}
              >
                Rechazar cotización
              </button>
            </div>   
            )
          }
          <div className="mt-4 flex justify-end">
            <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={onClose}
              >
                Cerrar
            </button>
          </div>
      </div>
    </div>
  );
};

export default UpdateModalCotizacionOut;