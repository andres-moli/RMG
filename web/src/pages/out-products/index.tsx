import { useState } from "react";
import Card from "../../components/cards/Card";
import MainLayout from "../../layouts/mainLayouts/mainLayouts";
import ProductTable from "../../components/products/tables/product-tables";
import RegisterModalProducts from "../../components/modals/modal-products/modal-add-products";
import ProductEntryTable from "../../components/products/tables/product-entry-tables";
import RegisterModalProductsEntry from "../../components/modals/modal-products-entry/modal-add-products-entry";
import ProductOutTable from "../../components/products/tables/product-out-tables";
import RegisterModalProductsOut from "../../components/modals/modal-products-out/modal-add-products-out";

const ProductsOutPage: React.FC = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  return (
    <MainLayout>
      <div className="space-y-4">
        <Card className="w-50 md:w-30 lg:w-50">
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Recibo de pago</h1>
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">Gestiona tus Recibo de pagos</h3>
          </div>
          <button
            onClick={openRegisterModal}
            type="button"
            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            + Crear
          </button>
        </div>

        </Card>
        <Card className="w-50 md:w-30 lg:w-50">
          <ProductOutTable />
        </Card>
      </div>
      <RegisterModalProductsOut
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
      />
    </MainLayout>
  );
};

export default ProductsOutPage;
