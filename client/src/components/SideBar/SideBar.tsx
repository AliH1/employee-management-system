import { useState, useContext } from 'react';
import { Sidebar, Menu, MenuItem, sidebarClasses} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PasswordIcon from '@mui/icons-material/Password';
import {UserContext } from '../../Context/UserContext';


export default function SideBar(){
  const [collapsed, setCollapsed] = useState(false);
  const {user} = useContext(UserContext);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sidebar
    collapsed={collapsed}
    rootStyles={{
      position: "sticky",
      top: 0,
      height: "100vh",
      [`.${sidebarClasses.container}`]: {
        backgroundColor: '#3C3D37',
        marginRight: '-1px',
      },
    }}>
      <Menu className='text-lg text-white' menuItemStyles={{
        button: {
          '&:hover':{
            backgroundColor: 'black'
          }
        }
      }}>
        <div className='flex flex-col h-screen flex-1'>
          <div className='mb-6'>
            <MenuItem style={{textAlign: 'center'}} icon= {<MenuIcon />} onClick={() => handleToggleSidebar()}>{user.name}</MenuItem>
          </div>
          <MenuItem icon= {<AccountBoxIcon/>} component={<Link to="/" />}>Home</MenuItem>
          <MenuItem icon= {<GroupIcon/>} component={<Link to="/employeesInfo" />}>Employee List</MenuItem>
          <MenuItem icon= {<QuestionAnswerIcon/>} component={<Link to="/employeeRequests" />}>Employee Requests</MenuItem>
          <MenuItem icon= {<PersonAddIcon/>} component={<Link to="/newAccount" />}>New Account</MenuItem>
          <MenuItem icon= {<PasswordIcon/>} component={<Link to="/changePassword" />}>Change Password</MenuItem>
          <MenuItem className='mt-auto' icon= {<LogoutIcon/>} component={<Link to="/login" />}>Logout</MenuItem>
        </div>
      </Menu>
    </Sidebar>
  )
}