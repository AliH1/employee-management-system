import { useContext, useEffect} from 'react';
import SideBar from './components/SideBar/SideBar';
import { Outlet, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import EmployeesInfo from './components/EmployeesInfo/EmployeesInfo';
import EmployeeRequests from './components/EmployeeRequests/EmployeeRequests';
import CreateAccount from './components/CreateAccount/CreateAccount';
import { UserContext } from './Context/UserContext';
import ChangePassword from './components/ChangePassword/ChangePassword';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import Login from './components/Login/Login';
import SendRequest from './components/SendRequest/SendRequest';


function App() {
  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    setUser({
      name: 'Admin',
      email: 'admin@gmail.com',
      isAdmin: true
    });
  }, [])


  const SidebarLayout = () => (
    <div className='flex stretch'>
      <aside>
        <SideBar />
      </aside>
      <main className='bg-background text-white flex-grow'>
        <Outlet />
      </main>
    </div>
  );

  //if user is not logged in, redirect to login page
  const wrapPrivateRoute = (element: React.ReactNode) => {
    return (
      <PrivateRoute>
        {element}
      </PrivateRoute>
    );
  };

  return (
    <Routes>
      <Route element={<SidebarLayout/>}>
        <Route path='/' element={wrapPrivateRoute(<Home />)} />
        <Route path='/admin/employeesInfo' element={wrapPrivateRoute(<EmployeesInfo />)} />
        <Route path='/admin/employeeRequests' element={wrapPrivateRoute(<EmployeeRequests />)} />
        <Route path='/admin/createAccount' element={wrapPrivateRoute(<CreateAccount />)} />
        <Route path='/changePassword' element={wrapPrivateRoute(<ChangePassword />)} />
        <Route path='/sendRequest' element={wrapPrivateRoute(<SendRequest />)} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
);
}

export default App
