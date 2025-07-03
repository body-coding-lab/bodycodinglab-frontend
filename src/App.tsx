import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Main from './views/main/Main';
import { useCookies } from 'react-cookie';
import { useAuthStore } from './stores/auth.store';
import { useEffect } from 'react';
import { useUserStore } from './stores/user.store';
import Layout from './views/main/Layout';

function App() {
  const [cookies] = useCookies(['accessToken']);
  const setLogin = useAuthStore((state) => state.setLogin);
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    const token = cookies.accessToken;
    if(token){
      setLogin(token);
    
      fetch('api/v2/users/me', {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
    }
  }, [cookies.accessToken]);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Main />} />
      </Route>
    </Routes>
  )
}

export default App;
