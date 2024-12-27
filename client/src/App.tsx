import { useContext, useEffect} from 'react';
import SideBar from './components/SideBar/SideBar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import EmployeesInfo from './components/EmployeesInfo/EmployeesInfo';
import EmployeeRequests from './components/EmployeeRequests/EmployeeRequests';
import { UserContext } from './Context/UserContext';

function App() {
  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    setUser({
      name: 'Admin',
      email: 'admin@gmail.com',
      isAdmin: true
    });
  }, [])

  return (
    <div className='flex stretch'>
      <aside>
        <SideBar />
      </aside>
      <main className='bg-background text-white flex-grow'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employeesInfo" element={<EmployeesInfo />} />
          <Route path="/employeeRequests" element={<EmployeeRequests />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
