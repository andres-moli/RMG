import React, { useEffect, useState } from 'react';
import { Cotizacion, MetadataPagination, OrderTypes, useCotizacionesQuery } from '../../../../domain/graphql';
import TableSkeleton from '../../../../components/esqueleto/table';
import Card from '../../../../components/cards/Card';
import { PaginationTable } from '../../../../components/table/PaginationTable';
import { BsEye } from 'react-icons/bs';
import { BiDownload, BiMailSend, BiShare } from 'react-icons/bi';
import UpdateModalCotizacionOut from '../modals/update-cotizacion';
import { dowloandCotizacion } from '../../../../lib/dowloandCotizacion';
import { MdMarkEmailUnread } from 'react-icons/md';
import { handleSendEmail } from '../../../../lib/sendMail';


const CotizacionesTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cotizacion, setCotizacion] = useState<Cotizacion>();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);
  const [loadginEmial, setLoadingEmail] = useState(false);
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    refetch();
  }, [searchQuery]);
  const [skip, setSkip] = useState(0)

  const takeValue = 10
  const {data, loading, refetch} = useCotizacionesQuery({
    variables: {
      pagination: {
        skip,
        take: takeValue
      },
      orderBy: {
        createdAt: OrderTypes.Desc
      },
      where: {
        description: {
          _contains: searchQuery
        }
      }
    }
  })
  const onEdit = async (cotizacion: Cotizacion) => {
    setCotizacion(cotizacion);
    openRegisterModal()
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
            placeholder="Buscar entrada de productos"
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
            <th scope="col" className="px-6 py-3"># cotización</th>
            <th scope="col" className="px-6 py-3">Cliente</th>
            <th scope="col" className="px-6 py-3">Estado</th>
            <th scope="col" className="px-6 py-3">Fecha</th>
            <th scope="col" className="px-6 py-3">Acción</th>
            <th scope="col" className="px-6 py-3">Descargar</th>
            <th scope="col" className="px-6 py-3">Enviar</th>
          </tr>
        </thead>
        <tbody>
          {
          data?.Cotizaciones?.map((cotizacion, index) => {
            
            return (
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
                <td className="px-6 py-4">{cotizacion.invoiceNumber}</td>
                <td className="px-6 py-4">{cotizacion.client.name + ' ' + cotizacion.client.lastName}</td>
                <td className="px-6 py-4">{cotizacion.status}</td>
                <td className="px-6 py-4">{cotizacion.createdAt}</td>
                <td className="px-6 py-4">
                    <BsEye className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" onClick={()=> onEdit(cotizacion)}/>
                </td>
                <td className="px-6 py-4">
                    <BiDownload className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" onClick={()=> dowloandCotizacion(cotizacion)}/>
                </td>
                <td>
                  {
                    loadginEmial
                    ?
                    <MdMarkEmailUnread />
                    :
                    <BiMailSend  className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" onClick={()=> handleSendEmail(cotizacion.client.email || '', cotizacion, 'COTIZACION',setLoadingEmail)}/>
                  }
                </td>
              </tr>
            )})}
        </tbody>
      </table>
      }
      <Card className="w-50 md:w-30 lg:w-50">
        <PaginationTable skipState={{ value: skip, setValue: setSkip }} metaDataPagination={data?.CotizacionesCount as MetadataPagination} takeValue={takeValue} />
      </Card>
      <UpdateModalCotizacionOut
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        cotizacion={cotizacion}
        key={cotizacion?.id}
      />
    </div>
  );
};

export default CotizacionesTable;
