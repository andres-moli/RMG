import { BiLogOut } from "react-icons/bi";
import { FaHome, FaStore, FaBox, FaTags, FaClipboardList, FaUser, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { FaMapLocation } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { BsFillPinMapFill, BsTools } from "react-icons/bs";
import { PiMapPinLineFill } from "react-icons/pi";
import { GrServices, GrUserSettings } from "react-icons/gr";
import { MdMiscellaneousServices } from "react-icons/md";

const SideBar = () => {
  const navigate = useNavigate()
  const onLogout = () => {
    Cookies.remove(import.meta.env.VITE_APP_KEY_COOKIE_SESSION)
    navigate('/login')
  }
  return (
    <aside className="fixed top-16 left-0 h-[calc(100%-4rem)] w-64 bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xs font-bold text-gray-800">INICIO</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              href="/"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <FaHome className="w-5 h-5 text-gray-500 mr-3" />
              Dashboard
            </a>
          </li>
        </ul>
        <h2 className="mt-6 text-xs font-bold text-gray-800">REPARACIONES</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              href="/repair"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <BsTools className="w-5 h-5 text-gray-500 mr-3" />
              reparaciones
            </a>
          </li>
          <li>
            <a
              href="/service"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <MdMiscellaneousServices   className="w-5 h-5 text-gray-500 mr-3" />
              Servicios
            </a>
          </li>
        </ul>
        <h2 className="mt-6 text-xs font-bold text-gray-800">CLIENTES</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              href="/client"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <FaUsers  className="w-5 h-5 text-gray-500 mr-3" />
              Clientes
            </a>
          </li>
        </ul>
        <h2 className="mt-6 text-xs font-bold text-gray-800">USUARIOS </h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              href="/user"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <FaUser  className="w-5 h-5 text-gray-500 mr-3" />
              Usuarios
            </a>
          </li>
        </ul>
        <h2 className="mt-6 text-xs font-bold text-gray-800">LOUGUT</h2>
        <ul className="mt-4 space-y-2">
          <li onClick={onLogout}>
            <a
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <BiLogOut className="w-5 h-5 text-gray-500 mr-3" />
              Cerrar sesión
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
