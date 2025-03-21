import React, { useEffect, useState } from 'react';
import { BiMailSend, BiPencil } from 'react-icons/bi';
import { MetadataPagination, OrderTypes, ProductInflow, ProductInflowEmun, ProductOutflow, Products, StatusInvoice, useProductsInflowsQuery, useProductsOutflowsQuery, useProductsQuery, User, UserStatusTypes, useUpdateProductInflowMutation, useUpdateProductOutflowMutation, useUsersQuery } from '../../../domain/graphql';
import { PaginationTable } from '../../table/PaginationTable';
import Card from '../../cards/Card';
import EditUserModal from '../../modals/modal-user/modal-edit-user';
import TableSkeleton from '../../esqueleto/table';
import { formatCurrency, ToastyErrorGraph } from '../../../lib/utils';
import EditModalProducts from '../../modals/modal-products/modal-edit-prodctus';
import { ImCancelCircle } from 'react-icons/im';
import { fireAlert } from '../../../domain/store/general.store';
import { toast } from 'sonner';
import { apolloClient } from '../../../main.config';
import { BsDownload, BsEye } from 'react-icons/bs';
import { dowlonadProductInoices } from '../../../lib/dowlonadProductInoices';
import EditModalProductsOut from '../../modals/modal-products-out/modal-edit-prodctus';
import { handleSendEmail } from '../../../lib/sendMail';
import { MdMarkEmailUnread } from 'react-icons/md';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { handleSendWhastapp } from '../../../lib/sendWhastapp';

const ProductOutTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [loadginEmial, setLoadingEmail] = useState(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    setSearchQuery(event.target.value);
  };
  const [skip, setSkip] = useState(0)
  const [product, setProduct] = useState<ProductOutflow>()
  const [update] = useUpdateProductOutflowMutation()

  const takeValue = 10
  const {data, loading, refetch} = useProductsOutflowsQuery({
    variables: {
      pagination: {
        skip,
        take: takeValue
      },
      orderBy: {
        createdAt: OrderTypes.Desc
      }
    }
  })
  const onEdit = async (produt: ProductInflow) => {
    // const resAlert = await fireAlert({
    //   type: "warning",
    //   title: "Anular Entrada",
    //   description: "¿Estas seguro que quieres anular esta entrada?",
    //   showCancelButton: true,
    // })
    if(confirm('¿Estas seguro que quieres anular este recibo?')){
      const toastId = toast.loading("Anulando recibo...")
      try {
        const resMutation = await update({
          variables: {
            updateInput: {
              id: produt.id,
              status: StatusInvoice.Anulada
            }
          }
        });
        if (resMutation.errors) {
          toast.error("¡Oops, hubo un error")
          return
        }
        toast.success("recibo anulado con exito")
        apolloClient.cache.evict({ fieldName: "ProductsOutflows" })

      } catch (error) {
      ToastyErrorGraph(error as any)
      } finally{
        toast.dismiss(toastId)
      }
    }
  }
  


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Buscar
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {
        loading
        ?
        <TableSkeleton columns={6} rows={6}/>
        :
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">Nombre cliente</th>
            <th scope="col" className="px-6 py-3">Metodo de pago</th>
            <th scope="col" className="px-6 py-3">Valor</th>
            <th scope="col" className="px-6 py-3">Estado</th>
            <th scope="col" className="px-6 py-3">Fecha</th>
            <th scope="col" className="px-6 py-3">Acción</th>
          </tr>
        </thead>
        <tbody>
          {
          data?.ProductsOutflows.map((product, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-search-${index}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4">{product.client.name + ' ' + product.client.lastName}</td>
                <td className="px-6 py-4">{product.paymentMethod}</td>
                <td className="px-6 py-4">{formatCurrency((product.invoiceProducts?.reduce((total, product) => total + product.total, 0) + product.invoiceServices?.reduce((total, product) => total + product.total, 0)) || 0)}</td>
                <td className="px-6 py-4">{product.status}</td>
                <td className="px-6 py-4">{ product.createdAt}</td>
                <td className="px-6 py-4">
                <BsDownload className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" onClick={()=> dowlonadProductInoices(product)}/>
                <BsEye className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" onClick={()=>{
                  setProduct(product),
                  openRegisterModal()
                }}/>
                </td>
                <td>
                  {
                    loadginEmial
                    ?
                    <MdMarkEmailUnread />
                    :
                    <BiMailSend title={product.client.email || 'No tiene correo'} className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" onClick={()=> handleSendEmail(product.client.email || '', product, 'RECIBO_PAGO_PRODUCTO_SERVICIO',setLoadingEmail)}/>
                  }
                   {
                    loadginEmial
                    ?
                    <IoLogoWhatsapp />
                    :
                    <IoLogoWhatsapp title={product.client.celular || 'No tiene celular'}  className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" onClick={()=> handleSendWhastapp(product.client.celular || '', product, 'RECIBO_PAGO_PRODUCTO_SERVICIO',setLoadingEmail)}/>
                  }
                </td>
                {
                  product.status === StatusInvoice.Pagada
                  &&
                  (
                    <td className="px-6 py-4">
                    <ImCancelCircle className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" onClick={()=> onEdit(product)}/>
                  </td>
                  )
                }
              </tr>
            ))}
        </tbody>
      </table>
      }
      <Card className="w-50 md:w-30 lg:w-50">
        <PaginationTable skipState={{ value: skip, setValue: setSkip }} metaDataPagination={data?.ProductsOutflowsCount as MetadataPagination} takeValue={takeValue} />
      </Card>
      <EditModalProductsOut
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        product={product}
        key={product?.id}
      />
    </div>
  );
};

export default ProductOutTable;
