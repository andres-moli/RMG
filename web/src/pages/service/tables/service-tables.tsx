import React, { useEffect, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { MetadataPagination, RepairType, useOrderRepairsTypeQuery, User, UserStatusTypes, useUsersQuery } from '../../../domain/graphql';
import Card from '../../../components/cards/Card';
import TableSkeleton from '../../../components/esqueleto/table';
import { PaginationTable } from '../../../components/table/PaginationTable';
import UpdateRegisterService from '../modal/modal-edit-service';

const ServiceTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    setSearchQuery(event.target.value);
  };
  const [skip, setSkip] = useState(0)
  const [user, setUser] = useState<RepairType>()

  const takeValue = 10
  const {data, loading, refetch} = useOrderRepairsTypeQuery({
    variables: {
      pagination: {
        skip,
        take: takeValue
      }
    }
  })
  const onEdit = (user: RepairType | undefined) => {
    console.log(user)
    setUser(user)
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
            <th scope="col" className="px-6 py-3">Nombre</th>
            <th scope="col" className="px-6 py-3">Valor</th>
            <th scope="col" className="px-6 py-3">Fecha</th>
            <th scope="col" className="px-6 py-3">Estado</th>
            <th scope="col" className="px-6 py-3">Total de campos</th>
            <th scope="col" className="px-6 py-3">Acción</th>
          </tr>
        </thead>
        <tbody>
          {
          data?.orderRepairsType?.map((repairType, index) => (
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
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  {/* <img
                    className="w-10 h-10 rounded-full"
                    src={user.profileImg}
                    alt={user.name}
                  /> */}
                  <div className="ps-3">
                    <div className="text-base font-semibold">{repairType.name}</div>
                  </div>
                </th>
                <td className="px-6 py-4">{repairType.costEstimate}</td>
                <td className="px-6 py-4">{repairType.createdAt}</td>
                <td className="px-6 py-4">{repairType.status ? 'Activo' : 'Inactivo'}</td>
                <td className="px-6 py-4">{repairType.fields?.length}</td>
                <td className="px-6 py-4">
                  <BiPencil className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" onClick={()=> onEdit(repairType)}/>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      }
      <Card className="w-50 md:w-30 lg:w-50">
        <PaginationTable skipState={{ value: skip, setValue: setSkip }} metaDataPagination={data?.orderRepairsTypeCount as MetadataPagination} takeValue={takeValue} />
      </Card>
      <UpdateRegisterService
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        service={user}
        key={user?.id}
      />
    </div>
  );
};

export default ServiceTable;
