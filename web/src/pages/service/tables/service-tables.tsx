import React, { useEffect, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { MetadataPagination, RepairType, useOrderRepairsTypeQuery } from '../../../domain/graphql';
import Card from '../../../components/cards/Card';
import TableSkeleton from '../../../components/esqueleto/table';
import { PaginationTable } from '../../../components/table/PaginationTable';
import UpdateRegisterService from '../modal/modal-edit-service';
import { AiOutlineSearch, AiOutlineReload } from 'react-icons/ai';

const ServiceTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [skip, setSkip] = useState(0);
  const [user, setUser] = useState<RepairType | undefined>();

  const takeValue = 10;

  const { data, loading, refetch } = useOrderRepairsTypeQuery({
    variables: {
      pagination: {
        skip,
        take: takeValue,
      },
      where: {
        name: {
          _contains: searchQuery
        }
      }, // Agregamos el filtro de búsqueda a la consulta
    },
  });

  // Función para abrir y cerrar el modal
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  // Función para manejar la búsqueda
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Disparar la búsqueda cuando cambia el `searchQuery`
  useEffect(() => {
    refetch();
  }, [searchQuery]); // Se ejecutará cuando cambie el valor de `searchQuery`

  // Función para editar un servicio
  const onEdit = (repairType: RepairType | undefined) => {
    setUser(repairType);
    openRegisterModal();
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
        {/* Input de búsqueda */}
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <AiOutlineSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar servicios..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Botón de Refresh */}
        <button
          onClick={() => refetch()}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          <AiOutlineReload className="mr-2" />
          Refrescar
        </button>
      </div>

      {loading ? (
        <TableSkeleton columns={6} rows={6} />
      ) : (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Nombre</th>
              <th scope="col" className="px-6 py-3">Valor</th>
              <th scope="col" className="px-6 py-3">Fecha</th>
              <th scope="col" className="px-6 py-3">Estado</th>
              <th scope="col" className="px-6 py-3">Total de campos</th>
              <th scope="col" className="px-6 py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {data?.orderRepairsType?.map((repairType, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{repairType.name}</td>
                <td className="px-6 py-4">{repairType.costEstimate}</td>
                <td className="px-6 py-4">{repairType.createdAt}</td>
                <td className="px-6 py-4">{repairType.status ? 'Activo' : 'Inactivo'}</td>
                <td className="px-6 py-4">{repairType.fields?.length}</td>
                <td className="px-6 py-4">
                  <BiPencil className="w-5 h-8 text-gray-500 cursor-pointer" onClick={() => onEdit(repairType)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Paginación */}
      <Card className="w-50 md:w-30 lg:w-50">
        <PaginationTable
          skipState={{ value: skip, setValue: setSkip }}
          metaDataPagination={data?.orderRepairsTypeCount as MetadataPagination}
          takeValue={takeValue}
        />
      </Card>

      {/* Modal de edición */}
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
