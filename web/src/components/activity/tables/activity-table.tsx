import { useEffect, useState } from "react";
import Card from "../../cards/Card";
import { BsEyeFill, BsQrCode } from "react-icons/bs";
import { MdApps } from "react-icons/md";
import { TbMapShare } from "react-icons/tb";
import { CustomFieldValue, MetadataPagination, OrderRepairty, OrderStatusEnum, OrderTypes, useGenrateQrByRepairLazyQuery, useOrderRepairQuery, useOrderRepairsQuery } from "../../../domain/graphql";
import dayjs from "dayjs";
import { PaginationTable } from "../../table/PaginationTable";
import { toast } from "sonner";
import UserSelect from "../../users/select/user-select";
import TableSkeleton from "../../esqueleto/table";
import ViewActivityModal from "../modal/view-activity";
import { BiCommentCheck } from "react-icons/bi";
import CommentModal from "../modal/comment-activity";
import MapsComponentComment from "../../Maps";
import ClientSelect from "../../users/select/client-select";
import { FaCashRegister } from "react-icons/fa";
import { downloadAndShareInvoice } from "../../../lib/dowlonadInovice";
import { PiCashRegisterBold, PiCashRegisterDuotone } from "react-icons/pi";
import generatePDF from "../../../lib/generatePdfReciv";
import { GrDocumentDownload } from "react-icons/gr";
import CreateInovice from "../modal/create-invoice";
import { downloadFromEntry } from "../../../lib/dowlonadFormEntry";
export const getRandomColor = (status: OrderStatusEnum) => {
  if (status === OrderStatusEnum.Pending) {
    return 'orange'; // Naranja claro
  }
  if (status === OrderStatusEnum.Completed) {
    return 'green'; // Verde claro
  }
  if (status === OrderStatusEnum.InProgress) {
    return 'b2ebf2'; // Amarillo claro
  }
  if (status === OrderStatusEnum.Canceled) {
    return 'red'; // Amarillo claro
  }
  return '#b2ebf2'; // Azul claro
};

export const getStatusLabel = (status: OrderStatusEnum) => {
  switch (status) {
    case OrderStatusEnum.Canceled:
      return 'Cancelada';
    case OrderStatusEnum.Completed:
      return 'Completada';
    case OrderStatusEnum.InProgress:
        return 'En proceso';
    case OrderStatusEnum.Pending:
      return 'Pendiente';
    default:
      return 'Desconocida';
  }
};

const ActivityTable = () => {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectUser, setSelectUser] = useState<string>("");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isCommentMapModalOpen, setIsCommentMapModalOpen] = useState(false);
  const [repair, setRepair] = useState<OrderRepairty>();
  const [dowlonadQrLazy] = useGenrateQrByRepairLazyQuery()





  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);
  
  const openCommentModal = () => setIsCommentModalOpen(true);
  const closeCommentModal = () => setIsCommentModalOpen(false);

  const openMapCommentModal = (visit: OrderRepairty) => {
    setRepair(visit)
    setIsCommentMapModalOpen(true);
  }
  const closeMapCommentModal = () => setIsCommentMapModalOpen(false);
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "status") {
      setStatusFilter(value);
    } else if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };
  const takeValue = 10
  const [skip, setSkip] = useState(0)
  const {data, loading, refetch} = useOrderRepairsQuery({
    variables: {
      orderBy: {
        createdAt: OrderTypes.Desc
      },
      pagination: {
        skip,
        take: takeValue
      },
      ...(statusFilter ? { status: { _eq: statusFilter } } : {}),
      ...(startDate && endDate ? { createdAt: { _between: [`${startDate} 00:00:00`, `${endDate} 23:59:59`] } } : {}),
      ...(description ? { description: { _contains: description } } : {}),
      ...(selectUser ? {client: {_eq: selectUser}} : {})
    }
  })
  const handelDelteFilter = async () => {
    const toastId = toast.loading('Borrando filtrado...')
    setSkip(0)
    setStatusFilter('')
    setStartDate('')
    setEndDate('')
    setDescription('')
    setSelectUser('')
    try {
      await refetch({
        orderBy: {
          createdAt: OrderTypes.Desc
        },
        pagination: {
          skip,
          take: takeValue
        },
        where: {}
      })
    }catch {
      toast.error('¡Oops! Ha ocurrido un error al intentar filtrar. Por favor, inténtelo más tarde.')
    }
    toast.dismiss(toastId)
  }
  const handleFilterSubmit = async () => {
    const toastId = toast.loading('Filtando informacion...')
    setSkip(0)
    try {
      await refetch({
        where: {
          ...(statusFilter ? { status: { _eq: statusFilter } } : {}),
          ...(startDate && endDate ? { createdAt: { _between: [`${startDate} 00:00:00`, `${endDate} 23:59:59`] } } : {}),
          ...(description ? { description: { _contains: description } } : {}),
          ...(selectUser ? {client: {_eq: selectUser}} : {})
        },
        orderBy: {
          createdAt: OrderTypes.Desc
        },
        pagination: {
          skip,
          take: takeValue
        }
      })
    } catch {
      toast.error('¡Oops! Ha ocurrido un error al intentar filtrar. Por favor, inténtelo más tarde.')
    }
    toast.dismiss(toastId)
    console.log("Filtros aplicados:", { statusFilter, startDate, endDate, description,selectUser });
  };
  const onShow = (visit: OrderRepairty) => {
    setRepair(visit)
    openRegisterModal()
  }
  const downloadQr = async (id: string) => {
    const result = await dowlonadQrLazy({
      variables: {
        idRepair: id
      }
    });
  
    if (!result.error) {
      const base64 = result.data?.genrateQrByRepair;
  
      if (base64) {
        // Extraer el tipo de contenido (ej: image/png)
        const mimeType = base64.match(/^data:(.*);base64,/)[1];
  
        // Convertir Base64 a Blob
        const byteCharacters = atob(base64.split(",")[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mimeType });
  
        // Crear un enlace para descargar
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "qr_code.png"; // Nombre del archivo
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
  
        // Liberar memoria
        URL.revokeObjectURL(url);
      }
    }
  };
  
  return (
      <>
        <div className="w-full md:w-full lg:w-full">
          <div className="flex justify-between items-center space-x-4">
            {/* Filtro de Estado */}
            <div className="flex space-x-4 flex-1">
              <ClientSelect onSelect={(e)=>setSelectUser(e)} clear={selectUser == ''}/>
            </div>
            <div className="flex-1">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
              <select
                name="status"
                id="status"
                value={statusFilter}
                onChange={handleFilterChange}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              >
                <option selected value={''}>Seleccionar Estado</option>
                <option value={OrderStatusEnum.Canceled}>Iniciada</option>
                <option value={OrderStatusEnum.Completed}>Completada</option>
                <option value={OrderStatusEnum.InProgress}>En proceso</option>
                <option value={OrderStatusEnum.Pending}>Pendiente</option>
              </select>
            </div>

            {/* Filtro de Rango de Fechas */}
            <div className="flex space-x-4 flex-1">
              <div className="w-1/2">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha Inicio</label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={startDate}
                  onChange={handleFilterChange}
                  className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha Fin</label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={endDate}
                  onChange={handleFilterChange}
                  className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Filtro de Descripción */}
            {/* <div className="flex-1">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
              <input
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={handleFilterChange}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                placeholder="Escribe una descripción"
              />
            </div> */}

            {/* Botón de Filtrar */}
            <div className="flex items-end">
              <button
                onClick={handleFilterSubmit}
                type="button"
                className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Filtrar
              </button>
            </div>
            <div className="flex items-end">
              <button
                onClick={handelDelteFilter}
                type="button"
                className="bg-red-500 text-white hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Borrar
              </button>
            </div>
          </div>
        </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        {/* Filtro Card */}
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {
                loading
                ?
                <TableSkeleton columns={6} rows={6}/>
                :
                <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Cliente
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Servicio
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Estado
                    </th>
                    <th scope="col" className="px-1 py-4">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.orderRepairs?.map((repair)=> {
                      return (
                        <tr className="border-b dark:border-neutral-500">
                        {/* <td>{repair.id}</td> */}
                        <td className="whitespace-nowrap px-6 py-4">{repair.client.name + ' ' + repair.client.lastName}</td>
                        <td className="whitespace-nowrap px-6 py-4">{dayjs(repair.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                        {/* <td>
                          {FormatTimeToMinut(visit)}
                        </td> */}
                        <td className="whitespace-nowrap px-6 py-4">{repair.repairType.name}</td>
                        <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div
                            className="h-2.5 w-2.5 rounded-full me-2"
                            style={{ backgroundColor: getRandomColor(repair.status) }}
                          ></div>
                          {getStatusLabel(repair.status)} {/* Mostrar estado en español */}
                        </div>
                      </td>
                        <td className="whitespace-nowrap px-6 py-4">
                           <BsEyeFill className="w-5 h-8 text-gray-500 mr-3 cursor-pointer"title="Ver Más" onClick={()=> onShow(repair)}/>
                        </td>
                        <td>
                          <BsQrCode className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" title="Ver QR" onClick={()=> downloadQr(repair.id)}/>
                        </td>
                        <td>
                        <GrDocumentDownload className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" title="Descargar archivo de entrega" onClick={()=> downloadFromEntry(repair)}/>
                        </td>
                        {/* {
                          repair.invoice &&(
                            <td>
                            <FaCashRegister className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" title="Ver recibo de pago" onClick={()=> downloadAndShareInvoice(repair.invoice)}/>
                            </td>
                          )
                        }
                        {
                          (repair.invoice == null && repair.status === OrderStatusEnum.Completed) &&(
                            <td>
                            <PiCashRegisterDuotone className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" title="Crear recibo de pago" onClick={()=> openMapCommentModal(repair)}/>
                            </td>
                          )
                        } */}
                      </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              }
            </div>
            <Card className="w-50 md:w-30 lg:w-50">
              <PaginationTable skipState={{ value: skip, setValue: setSkip }} metaDataPagination={data?.orderRepairsCount as MetadataPagination} takeValue={takeValue} />
            </Card>
          </div>
        </div>
      </div>
      <ViewActivityModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        visit={repair}
        key={repair?.id}
      />
      <CreateInovice 
        isOpen={isCommentMapModalOpen}
        onClose={closeMapCommentModal}
        orderRepair={repair}
        key={repair?.id}
      />
    </>
    );
  };
  
  export default ActivityTable;
  