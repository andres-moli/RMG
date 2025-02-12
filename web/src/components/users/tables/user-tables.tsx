import React, { useEffect, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlineReload } from 'react-icons/ai';
import { MetadataPagination, User, UserStatusTypes, useUsersQuery } from '../../../domain/graphql';
import { PaginationTable } from '../../table/PaginationTable';
import Card from '../../cards/Card';
import EditUserModal from '../../modals/modal-user/modal-edit-user';
import TableSkeleton from '../../esqueleto/table';

const UserTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [skip, setSkip] = useState(0);
  const [user, setUser] = useState<User | undefined>();

  const takeValue = 10;

  const { data, loading, refetch } = useUsersQuery({
    variables: {
      pagination: { skip, take: takeValue },
      where: {
        name: {
          _contains: searchQuery
        },
        _or: [
          {
            email: {
              _contains: searchQuery
            }
          }
        ]
      }, // Agregamos búsqueda a la consulta
    },
  });

  // Actualizar la tabla cuando cambia `searchQuery`
  useEffect(() => {
    refetch();
  }, [searchQuery]);

  // Manejo del modal
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  // Manejar la búsqueda
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Editar usuario
  const onEdit = (user: User) => {
    setUser(user);
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
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar usuarios..."
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
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Documento</th>
              <th className="px-6 py-3">Celular</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {data?.users.map((user, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{user.fullName}</td>
                <td className="px-6 py-4">{user.identificationNumber}</td>
                <td className="px-6 py-4">{user.phoneNumber}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        user.status === UserStatusTypes.Active ? 'bg-blue-500' : 'bg-red-500'
                      } me-2`}
                    ></div>
                    {
                      {
                        Active: 'Activo',
                        Inactive: 'Inactivo',
                        PartlyActive: 'Parcialmente Activo',
                      }[user.status] || 'Estado desconocido'
                    }
                  </div>
                </td>
                <td className="px-6 py-4">
                  <BiPencil className="w-5 h-8 text-gray-500 cursor-pointer" onClick={() => onEdit(user)} />
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
          metaDataPagination={data?.usersCount as MetadataPagination}
          takeValue={takeValue}
        />
      </Card>

      {/* Modal de edición */}
      <EditUserModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        user={user}
        key={user?.id}
      />
    </div>
  );
};

export default UserTable;
