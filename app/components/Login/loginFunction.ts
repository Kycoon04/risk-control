import { useEffect} from 'react';
import { useAuthStore } from '@/provider/store';
import { publicClientApplication } from './publicClientApp';
import { fetchUserRol, fetchUser } from './userConfig';
import { config } from '@/lib/Config';
interface LoginProps {  scopes?: string[]; }

export const useAuthentication = () => {
  const setUser = useAuthStore(state => state.setUser);
  const changelogged = useAuthStore(state => state.changeLogged);
  const setRol = useAuthStore(state => state.setRol);

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
         const account = await publicClientApplication.loginPopup({
           scopes: props?.scopes || config.scopes,
           prompt: 'select_account',
         });
      const user = await fetchUser({
        id: "",
        name: "",
        second_name: "",
        surname: "",
        second_surname: "",
        email: account.account.username, //  account.account.username
        phone_number: "",
        nickname: "",
        identification: "",
        department: ""
      });
      if (user[0]) {
        const role = await fetchUserRol({
          id: "",
          user: user[0].id,
          role: ""
        });
        setRol(role);
        changelogged();
        setUser(user[0]);
        return true;
      }
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  }
  return { login};
}