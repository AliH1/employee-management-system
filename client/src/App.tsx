import { useState } from 'react';
import SideBar from './components/SideBar/SideBar';
import { Route, Routes } from 'react-router-dom';
import EmployeeMessages from './components/EmployeeMessages/EmployeeMessages';
import Home from './components/Home/Home';
import EmployeeList from './components/EmployeeList/EmployeeList';

function App() {

  return (
    <>
    <div className='flex stretch min-h-full h-full'>
      <aside>
        <SideBar />
      </aside>
      <main className='bg-background flex-grow text-white'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employeeList" element={<EmployeeList />} />
          <Route path="/employeeRequests" element={<EmployeeMessages />} />
        </Routes>
      </main>
    </div>
    </>
  )
}

export default App
