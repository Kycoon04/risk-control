"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import Standard_button from './Button';
import { useRouter } from 'next/navigation';
import { PublicClientApplication } from '@azure/msal-browser';
import { config } from '@/Config';
import { fetchUsers, fetchUserRole, fetchRole } from './actions';
import { User, RoleXUser, useAuthStore } from '@/provider/store';
import { ToastContainer } from 'react-toastify';
import { Error } from './alerts';
import 'react-toastify/dist/ReactToastify.css';

interface LoginProps {
  scopes?: string[];
}

const publicClientApplication = new PublicClientApplication({
  auth: {
    clientId: config.appId,
    redirectUri: config.redirectUri,
    authority: config.authority,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
});

const App: React.FC = () => {
  let isAuthenticated = false;
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);
  const changelogged = useAuthStore(state => state.changeLogged);
  const setRol = useAuthStore(state => state.setRol);

  const fetchUser = async (props: User) => {
    const fetchedForms = await fetchUsers(props);
    return fetchedForms.props.data;
  };
  
  const fetchUserRol = async (props: RoleXUser) => {
    const fetchedRoleXUser = await fetchUserRole(props);
    const fetchedRole = await fetchRole(fetchedRoleXUser.props.data[0].role);
    return fetchedRole.props.data;
  };

  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await publicClientApplication.initialize();
      } catch (err) {
        console.error('MSAL initialization error:', err);
      }
    };
    initializeMsal();
  }, []);

  async function login(props?: LoginProps) {
    try {
      /*const account = await publicClientApplication.loginPopup({
        scopes: props?.scopes || config.scopes,
        prompt: 'select_account',
      });*/
      const user = await fetchUser({
        id: "",
        name: "",
        second_name: "",
        surname: "",
        second_surname: "",
        email: "jomaval4@gmail.com"/*account.account.username*/,
        phone_number: "",
        nickname: "",
        identification: "",
        department: ""
      });
      if (user[0]) {
        isAuthenticated = true;
        const role = await fetchUserRol({
          id: "",
          user: user[0].id,
          role: ""
        });
        setRol(role.name);
        changelogged();
        setUser(user[0]);
      }
    } catch (err) {
      console.error('Login error:', err);
      isAuthenticated = false;
    }
  }

  const submitForm = async () => {
    try {
      await login();
      if (isAuthenticated) {
        router.push("/home_page");
      } else {
        Error("No se pudo iniciar sesión. Por favor intente de nuevo.");
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <div className='bg-gray-200 rounded-3xl py-5 drop-shadow-lg m-11 flex flex-col items-center pr-7 pl-7'>
        <div className="flex justify-center bg-gray-100 rounded-full mb-5">
          <Image className='m-6' src='/login/userbasic.png' alt="Screenshots of the dashboard " width={60} height={60} />
        </div>
        <h2 className="text-center text-3xl font-semibold text-white">
          {'Inicio de sesión'}
        </h2>
        <div className="flex flex-col items-center my-4 w-full">
          <Standard_button fuction={submitForm} titule={"Iniciar sesión"} width={"350px"}></Standard_button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
export default App;