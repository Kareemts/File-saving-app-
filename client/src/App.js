import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import ServerError from './components/errorPages/ServerError';
import PrivetRouter from './PrivetRouter';
import ViewLogin from './pages/ViewLogin';
import ViewSignUp from './pages/ViewSignUp';
import ViewHome from './pages/user/ViewHome';
import PrivetRouterAdmin from './PrivetRouterAdmin';
import ViewAdminDashbord from './pages/admin/ViewAdminDashbord';
import LoginAuthorisation from './LoginAuthorisation';
import Authorisation from './Authorisation';

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route element={<LoginAuthorisation />}>
            <Route path="/" element={<ViewLogin />} />
          </Route>

          <Route path="/SignUp" element={<ViewSignUp />} />
          <Route path="/error" element={<ServerError />} />
          <Route element={<Authorisation />}>
            <Route element={<PrivetRouter />}>
              <Route path="/Home" element={<ViewHome />} />
            </Route>

            <Route element={<PrivetRouterAdmin />}>
              <Route path="/admin/dashboard" element={<ViewAdminDashbord />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
