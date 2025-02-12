import React from 'react';
import { Navigate } from 'react-router-dom';// Asumiendo que esta es la consulta GraphQL generada
import Cookies from 'js-cookie';
import { useValidateUserTokenQuery, ValidateUserTokenDocument } from '../domain/graphql';
import { useApolloClient } from '@apollo/client';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const token = Cookies.get(import.meta.env.VITE_APP_KEY_COOKIE_SESSION);
  const client = useApolloClient();
  if(!token)  return <Navigate to="/login" />;
  const { loading, data, error } = useValidateUserTokenQuery({
    variables: {
      validateTokenInput: {
        token: token,
      },
    },
    onCompleted: (data) => {
      if (data?.validateUserToken) {
        client.writeQuery({
          query: ValidateUserTokenDocument,
          data: { validateUserToken: data.validateUserToken },
        });
      }
    },
    onError: () => {
      Cookies.remove(import.meta.env.VITE_APP_KEY_COOKIE_SESSION)
    },
    fetchPolicy: "cache-first",
  });

  if (loading) {
    return (
      <div className="h-screen bg-[#5DADE2] dark:bg-[#007BFF] w-screen flex justify-center items-center flex-col">
        <img src="/loading.svg" alt="" /> <br />
        <img src="logo.png" alt="" />

      </div>
    );
  }

  // Si no se valida el token correctamente, redirigir al login
  if (!data || !data.validateUserToken) {
    Cookies.remove(import.meta.env.VITE_APP_KEY_COOKIE_SESSION)
    return <Navigate to="/login" />;
  }

  return <>{element}</>;
};

export default ProtectedRoute;
