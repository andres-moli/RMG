import React, { useState } from "react";
import { ProductOutflow, Products, useCreateProductMutation, useUpdateProductMutation } from "../../../domain/graphql";
import { toast } from "sonner";
import { formatCurrency, ToastyErrorGraph } from "../../../lib/utils";
import { apolloClient } from "../../../main.config";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductOutflow | undefined
}
const EditModalProductsOut: React.FC<RegisterModalProps> = ({ isOpen, onClose, product }) => {
  if(!product) return
  if (!isOpen) return null;
  const calculateTotalInvoice = () => {
    const totaP =  product.invoiceProducts?.reduce((total, product) => total + product.total, 0) || 0;
    const totaS=  product.invoiceServices?.reduce((total, product) => total + product.total, 0) || 0;
    return totaP + totaS
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[800px] shadow-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Ver recibo de productos</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">Nombre cliente</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.client.name + ' ' + product.client.lastName}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
            />
            <label htmlFor="fecha" className="block text-sm font-medium">Fecha</label>
            <input
              type="text"
              id="fecha"
              name="fecha"
              value={product.createdAt}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
            />
            <label htmlFor="metodo" className="block text-sm font-medium">Metodo de pago</label>
            <input
              type="text"
              id="metodo"
              name="metodo"
              value={product.paymentMethod}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
            />
            <label htmlFor="Estado" className="block text-sm font-medium">Estado</label>
            <input
              type="text"
              id="Estado"
              name="Estado"
              value={product.status}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
            />
            {
              product.description
              &&
              (
                <>
                  <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
                  <textarea
                  disabled
                    id="description"
                    name="description"
                    value={product.description}
                    className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
                  />         
                </>
              )
            }
            <h3 className="bottom-4 right-4 mt-4 text-lg font-semibold">
              Total recibo de pago: {formatCurrency(calculateTotalInvoice())}
            </h3>
            <div className="mt-4 mx-auto p-4">
              <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Descuento (%)</th>
                  <th>Impuesto (%)</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
              {product.invoiceProducts?.map((product, index) => (
                  <tr key={index} className="border-b">
                    {/* Columna de Producto - ocupa más espacio */}
                    <td className="w-1/3">
                      <input
                        type="text"
                        value={product.product.name}
                        className="w-full p-3 border border-gray-300 rounded text-xs"
                        disabled={true}
                      />
                    </td>

                    {/* Columnas de valores numéricos más estrechas */}
                    <td className="w-1/10">
                      <input
                        type="number"
                        value={product.quantity}
                        className="w-full p-3 border border-gray-300 rounded text-xs"
                        disabled={true}
                      />
                    </td>
                    <td className="w-1/10">
                      <input
                        type="number"
                        value={product.discount || 0}
                        className="w-full p-3 border border-gray-300 rounded text-xs"
                        disabled={true}
                      />
                    </td>
                    <td className="w-1/10">
                      <input
                        type="number"
                        value={product.tax || 0}
                        className="w-full p-3 border border-gray-300 rounded text-xs"
                        disabled={true}
                      />
                    </td>
                    <td className="w-1/6 p-1 text-right">
                      <input
                        type="number"
                        value={product.total}
                        className="w-full p-3 border border-gray-300 rounded text-xs"
                        disabled={true}
                      />
                    </td>
                  </tr>
              ))}
              {product.invoiceServices?.map((product, index) => (
                  <tr key={index} className="border-b">
                    {/* Columna de Producto - ocupa más espacio */}
                    <td className="w-1/3">
                      <input
                        type="text"
                        value={product.service.name}
                        className="w-full p-3 border border-gray-300 rounded text-xs"
                        disabled={true}
                      />
                    </td>

                    {/* Columnas de valores numéricos más estrechas */}
                    <td className="w-1/10">
                      <input
                        type="number"
                        value={product.quantity}
                        className="w-full p-3 border border-gray-300 rounded text-xs"
                        disabled={true}
                      />
                    </td>
                    <td className="w-1/10">
                      <input
                        type="number"
                        value={product.discount || 0}
                        className="w-full p-3 border border-gray-300 rounded text-xs"
                        disabled={true}
                      />
                    </td>
                    <td className="w-1/10">
                      <input
                        type="number"
                        value={product.tax || 0}
                        className="w-full p-3 border border-gray-300 rounded text-xs"
                        disabled={true}
                      />
                    </td>
                    <td className="w-1/6 p-1 text-right">
                      <input
                        type="number"
                        value={product.total}
                        className="w-full p-3 border border-gray-300 rounded text-xs"
                        disabled={true}
                      />
                    </td>
                  </tr>
              ))}
              </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Cerrar
            </button>
          </div>
      </div>
    </div>
  );
};

export default EditModalProductsOut;
