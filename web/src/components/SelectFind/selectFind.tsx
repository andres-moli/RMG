import { CheckIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';

type Option = { key: string | number; value: string };

interface SearchableSelectProps {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ options, value, onChange, placeholder = "Selecciona una opción" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar opciones en función del término de búsqueda
  const filteredOptions = options.filter(option =>
    option.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener el valor seleccionado para mostrar
  const selectedOption = options.find(option => option.key === value);

  const handleOptionClick = (key: string | number) => {
    onChange(key); // Actualizar el valor seleccionado en el componente padre
    setIsOpen(false); // Cerrar el desplegable
    setSearchTerm(""); // Limpiar el campo de búsqueda
  };

  return (
    <div className="relative w-full">
      <div
        className="border rounded p-2 cursor-pointer bg-white flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.value : placeholder}</span>
      </div>

      {isOpen && (
        <div className="absolute z-10 bottom-full mb-2 w-full bg-white border rounded shadow-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar..."
            className="w-full p-2 border-b"
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.key}
                  onClick={() => handleOptionClick(option.key)}
                  className="p-2 hover:bg-gray-200 cursor-pointer flex items-center justify-between"
                >
                  <span>{option.value}</span>
                  {selectedOption?.key === option.key && <CheckIcon />}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">Sin resultados</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;