import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Main from './views/main/Main';
import { useCookies } from 'react-cookie';
import { useAuthStore } from './stores/auth.store';
import { useEffect } from 'react';
import { useUserStore } from './stores/user.store';
import Layout from './views/main/Layout';
import Board from './views/board/Board';
import RedirectToUserMatch from './views/board/RedirectToUserMatch';
import Post from './views/board/Post';
import BoardTrainerPage from './views/board/BoardTrainerPage';

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
        <Route path='/personal-community-boards' element={<RedirectToUserMatch />} />
        <Route path='/personal-community-boards/trainer' element={<BoardTrainerPage />} />
        <Route path='/personal-community-boards/:matchId/:categoryId/:postId' element={<Post />} />
        <Route path='/personal-community-boards/:matchId/:categoryId' element={<Board />} />
      </Route>
    </Routes>
  )
}

export default App;
