import React, { useState, useEffect } from "react";
import { Client, Products, useClientsQuery, useProductsQuery, useUsersQuery } from "../../domain/graphql";
import { BiLoader } from "react-icons/bi";

interface SelectProductProps {
  onSelect: (product: Client) => void;
}

const SelectClientFind: React.FC<SelectProductProps> = ({ onSelect }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [skip] = useState(0);
  const [takeValue] = useState(10);

  const { data, loading } = useClientsQuery({
    variables: {
      pagination: { skip, take: takeValue },
      where: { 
        name: { _contains: debouncedSearch || "" },
        _or: [
          {
            lastName: { _contains: debouncedSearch || "" }
          }
        ]
      },
    },
    skip: !debouncedSearch,
  });

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedSearch(search);
  //     setIsOpen(!!search);
  //   }, 500);
  //   return () => clearTimeout(handler);
  // }, [search]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar cliente..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Permite seleccionar antes de cerrar
        className="w-full border p-2 rounded-md"
      />

      {loading && <BiLoader className="absolute right-2 top-2 animate-spin" />}

      {isOpen && (
        <ul className="absolute w-full bg-white border rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
          {data?.clients.length > 0 ? (
            data?.clients.map((product) => (
              <li
                key={product.id}
                onMouseDown={(e) => {
                  e.preventDefault(); // Evita que el input reciba el foco
                  onSelect(product);
                  setSearch(product.name);
                  setIsOpen(false);
                }}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {product.name}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No se encontraron productos</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SelectClientFind;
