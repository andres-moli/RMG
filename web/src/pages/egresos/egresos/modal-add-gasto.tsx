import React, { useState } from "react";
import { OrderTypes, PaymentMethodEnum, StatusCategoryExpenses, StatusCountExpenses, StatusExpenses, useCategoryExpensesQuery, useCountExpensesQuery, useCreateCategoryExpenseMutation, useCreateExpenseMutation, useCreateProductMutation } from "../../../domain/graphql";
import { toast } from "sonner";
import { formatCurrency, ToastyErrorGraph } from "../../../lib/utils";
import { apolloClient } from "../../../main.config";
import { optionMethodPayment } from "../../../components/activity/modal/create-invoice";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const RegisterModalExpenses: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [create] = useCreateExpenseMutation()
  const [formData, setFormData] = useState({
    description: "",
    paymentMethod: "",
    categoryId: "",
    amount: "",
    countId: ""
  });

  const [errors, setErrors] = useState({
    description: "",
    paymentMethod: "",
    categoryId: "",
    amount: "",
    countId: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) || 0 : value, // Convertir a número si es input de tipo number
    }));
  
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };
  

  const validateForm = () => {
    let formErrors: any = {};
    if (!formData.amount) formErrors.amount = "Este campo es obligatorio";
    if (!formData.categoryId) formErrors.categoryId = "Este campo es obligatorio";
    if (!formData.paymentMethod) formErrors.paymentMethod = "Este campo es obligatorio";
    if (!formData.countId) formErrors.countId = "Este campo es obligatorio";

    return formErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const toatsId = toast.loading('Creando categoria de gasto..')
    try {
      const res = await create({
        variables: {
          createInput: {
            ...formData,
            amount: Number(formData.amount),
            expenseDate: new Date(),
            paymentMethod: formData.paymentMethod as PaymentMethodEnum,
            status: StatusExpenses.Pagada
          }
        }
      })
      if(res.errors){
        toast.error(res.errors[0].message);
        toast.dismiss(toatsId)
        return
      }
      toast.success('Categoria de gasto creado...');
      apolloClient.cache.evict({ fieldName: "Expenses" })
    } catch (err) {
        ToastyErrorGraph(err as any)
    } finally {
      toast.dismiss(toatsId)
    }
    setFormData({
      description: "",
      paymentMethod: "",
      categoryId: "",
      amount: "",
      countId: ""
    });
    onClose(); // Cerrar el modal después de enviar
  };
  const { data, loading } = useCategoryExpensesQuery({
    variables: {
      orderBy: { name: OrderTypes.Asc },
      where: {
        status: {
          _eq: StatusCategoryExpenses.Activo
        }
      },
      pagination: {
        skip: 0,
        take: 99999999
      }
    }
  });
  const optionCategory = data?.CategoryExpenses.map((x) => ({
    key: x.id,
    value: x.name
  })) || [];
  const { data: dataCount, loading: loadingCount } = useCountExpensesQuery({
    variables: {
      orderBy: { name: OrderTypes.Asc },
      where: {
        status: {
          _eq: StatusCountExpenses.Activo
        }
      },
      pagination: {
        skip: 0,
        take: 99999999
      }
    }
  });
  const optionCount = dataCount?.CountExpenses.map((x) => ({
    key: x.id,
    value: x.nameBank + ' - ' + x.numberCount
  })) || [];
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[800px] shadow-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Registro de categoria gasto</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="categoryId" className="block text-sm font-medium">Una categoria</label>
          {
            loading
            ?
            <>
            Cargando cateogria
            </>
            :
            <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
          >
            <option disabled selected value={''}>Seleccione un tipo</option>
            {
              optionCategory.map((id)=> {
                return (
                  <option value={id.key}>{id.value}</option>
                )
              })
            }
          </select>
          }
          <br />
          <label htmlFor="countId" className="block text-sm font-medium">Una cuenta</label>
          {
            loading
            ?
            <>
            Cargando cuentas
            </>
            :
            <select
              id="countId"
              name="countId"
              value={formData.countId}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
            >
            <option disabled selected value={''}>Seleccione un tipo</option>
            {
              optionCount.map((id)=> {
                return (
                  <option value={id.key}>{id.value}</option>
                )
              })
            }
          </select>
          }
          <br />
          <label htmlFor="paymentMethod" className="block text-sm font-medium">Metodo de pago</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
          >
            <option disabled selected value={''}>Seleccione un tipo</option>
            {
              optionMethodPayment.map((id)=> {
                return (
                  <option value={id.key}>{id.value}</option>
                )
              })
            }
          </select>
          <br />
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium">{`Monto a pagar [${formatCurrency(Number(formData.amount))}]`}</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.amount && <span className="text-red-500 text-sm">{errors.amount}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">Descripcion</label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`mt-1 block w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModalExpenses;
