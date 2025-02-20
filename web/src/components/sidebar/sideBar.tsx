import { useState } from "react";
import { BiLogOut, BiSolidBank, BiSolidCategory } from "react-icons/bi";
import { FaHome, FaUser, FaUsers, FaPlusSquare, FaCashRegister, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { BsTools } from "react-icons/bs";
import { MdMiscellaneousServices } from "react-icons/md";
import { IoBarChartSharp, IoClose, IoDocumentText, IoPricetagsSharp } from "react-icons/io5";
import { RiShoppingBag3Fill } from "react-icons/ri";

const SideBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const onLogout = () => {
    Cookies.remove(import.meta.env.VITE_APP_KEY_COOKIE_SESSION);
    navigate('/login');
  };

  const menuGroups = [
    {
      title: "General",
      items: [
        { label: "Dashboard", icon: <FaHome className="w-5 h-5 text-gray-500 mr-3" />, path: "/" },
        { label: "Reportes", icon: <IoBarChartSharp className="w-5 h-5 text-gray-500 mr-3" />, path: "/report" },
      ],
    },
    {
      title: "Gestión",
      items: [
        { label: "Reparaciones", icon: <BsTools className="w-5 h-5 text-gray-500 mr-3" />, path: "/repair" },
        { label: "Crear reparación", icon: <FaPlusSquare className="w-5 h-5 text-gray-500 mr-3" />, path: "/create-repair" },
        { label: "Servicios", icon: <MdMiscellaneousServices className="w-5 h-5 text-gray-500 mr-3" />, path: "/service" },
      ],
    },
    {
      title: "Pagos y cotizaciones",
      items: [
        { label: "Recibo de pago", icon: <FaCashRegister className="w-5 h-5 text-gray-500 mr-3" />, path: "/out-products" },
        { label: "Cotizaciones", icon: <IoDocumentText className="w-5 h-5 text-gray-500 mr-3" />, path: "/quotations" },
      ],
    },
    {
      title: "Usuarios",
      items: [
        { label: "Clientes", icon: <FaUsers className="w-5 h-5 text-gray-500 mr-3" />, path: "/client" },
        { label: "Usuarios", icon: <FaUser className="w-5 h-5 text-gray-500 mr-3" />, path: "/user" },
      ],
    },
    {
      title: "Mis Productos",
      items: [
        { label: "Mis Productos", icon: <RiShoppingBag3Fill />, path: "/product" },
        { label: "Entrada de producto", icon: <IoPricetagsSharp className="w-5 h-5 text-gray-500 mr-3" />, path: "/product-entry" },
      ],
    },
    {
      title: "Egresos",
      items: [
        { label: "Mis Egresos", icon: <RiShoppingBag3Fill className="w-5 h-5 text-gray-500 mr-3" />, path: "/expenses" },
        { label: "Categoría de Egresos", icon: <BiSolidCategory className="w-5 h-5 text-gray-500 mr-3" />, path: "/expenses-category" },
        { label: "Cuentas", icon: <BiSolidBank className="w-5 h-5 text-gray-500 mr-3" />, path: "/expenses-accounts" },
      ],
    },
  ];

  return (
    <aside className="fixed top-16 left-0 h-[calc(100%-4rem)] w-64 bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
      <div className="p-6">
      <div className="relative mb-4">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          {search && (
            <IoClose 
              className="absolute right-3 top-3 text-gray-500 cursor-pointer" 
              onClick={() => setSearch("")} 
            />
          )}
        </div>
        {menuGroups.map((group, index) => {
          const filteredItems = group.items.filter((item) => item.label.toLowerCase().includes(search));
          if (filteredItems.length === 0) return ;
          return (
            <div key={index} className="mt-4">
              <h2 className="text-xs font-bold text-gray-800 mb-2">{group.title}</h2>
              <ul className="space-y-2">
                {filteredItems.map((item, i) => (
                  <li key={i}>
                    <a href={item.path} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                      {item.icon}
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        <h2 className="mt-6 text-xs font-bold text-gray-800">LOGOUT</h2>
        <ul className="mt-4 space-y-2">
          <li onClick={onLogout}>
            <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
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
