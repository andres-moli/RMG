import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import UserPage from '../pages/user';
import LoginPage from '../pages/login';
import ProtectedRoute from './ProtectedRoute'; // Importamos el componente ProtectedRoute
import ActivityPage from '../pages/Activity';
import TimeRealPage from '../pages/timeReal';
import PreviewPage from '../pages/Form/PreviewPage';
import ClientPage from '../pages/client';
import ServicePage from '../pages/service';
import StepProgressPage from '../components/modals/modal-categories/modal-add-categories';
import ProductsPage from '../pages/products';
import ProductsEntryPage from '../pages/entry-products';
import ProductsOutPage from '../pages/out-products';
import CategoriaEgresosPage from '../pages/egresos/categoria';
import EgresosPage from '../pages/egresos/egresos';
import ReportPage from '../pages/Reports';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="login" element={<LoginPage />} />
        
        {/* Rutas protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute element={<Dashboard />} />
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute element={<UserPage />} />
          }
        />
        <Route
          path="/repair"
          element={
            <ProtectedRoute element={<ActivityPage />} />
          }
        />
        <Route
          path="/client"
          element={
            <ProtectedRoute element={<ClientPage />} />
          }
        />
        <Route
          path="/service"
          element={
            <ProtectedRoute element={<ServicePage />} />
          }
        />
        <Route
          path="/create-repair"
          element={
            <ProtectedRoute element={<StepProgressPage />} />
          }
        />
        <Route
          path="/product"
          element={
            <ProtectedRoute element={<ProductsPage />} />
          }
        />
        <Route
          path="/entry-products"
          element={
            <ProtectedRoute element={<ProductsEntryPage />} />
          }
        />
        <Route
          path="/out-products"
          element={
            <ProtectedRoute element={<ProductsOutPage />} />
          }
        />
        <Route
          path="/expenses-category"
          element={
            <ProtectedRoute element={<CategoriaEgresosPage />} />
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute element={<EgresosPage />} />
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute element={<ReportPage />} />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
