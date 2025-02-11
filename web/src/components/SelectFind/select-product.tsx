import React, { useState, useEffect } from "react";
import { Products, useProductsQuery } from "../../domain/graphql";
import { BiLoader } from "react-icons/bi";

interface SelectProductProps {
  onSelect: (product: Products) => void;
}

const SelectProduct: React.FC<SelectProductProps> = ({ onSelect }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Controla visibilidad del dropdown
  const [skip] = useState(0);
  const [takeValue] = useState(10);

  const { data, loading } = useProductsQuery({
    variables: {
      pagination: {
        skip,
        take: takeValue,
      },
      where: {
        name: {
          _contains: debouncedSearch || "",
        },
      },
    },
    skip: !debouncedSearch,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setIsOpen(!!search); // Abre el dropdown si hay texto
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar producto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsOpen(true)} // Reabre el dropdown al hacer foco
        className="w-full border p-2 rounded-md"
      />

      {loading && <BiLoader className="absolute right-2 top-2 animate-spin" />}

      {isOpen && data?.Products && (
        <ul className="absolute w-full bg-white border rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
          {data.Products.length > 0 ? (
            data.Products.map((product) => (
              <li
                key={product.id}
                onClick={() => {
                  onSelect(product);
                  setSearch(product.name); // Muestra el nombre seleccionado
                  setIsOpen(false); // Cierra la lista
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

export default SelectProduct;
