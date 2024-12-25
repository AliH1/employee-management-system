import { useState } from 'react';
import { Sidebar, Menu, MenuItem, sidebarClasses} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function SideBar(){
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sidebar style={{height: '100vh'}}
    collapsed={collapsed}
    rootStyles={{
      [`.${sidebarClasses.container}`]: {
        backgroundColor: '#3C3D37',
        marginRight: '-1px',
      },
    }}>
      <Menu style={{color: 'white', fontSize: '18px'}} menuItemStyles={{
        button: {
          '&:hover':{
            backgroundColor: 'black'
          }
        }
      }}>
        <div className='flex flex-col h-screen flex-1'>
          <div className='mb-6'>
            <MenuItem style={{textAlign: 'center'}} icon= {<MenuIcon />} onClick={() => handleToggleSidebar()}>Admin</MenuItem>
          </div>
          <MenuItem icon= {<AccountBoxIcon/>} component={<Link to="/home" />}>Home</MenuItem>
          <MenuItem icon= {<GroupIcon/>} component={<Link to="/employeeList" />}>Employee List</MenuItem>
          <MenuItem icon= {<QuestionAnswerIcon/>} component={<Link to="/employeeRequests" />}>Employee Requests</MenuItem>
          <MenuItem className='mt-auto' icon= {<LogoutIcon/>} component={<Link to="/login" />}>Logout</MenuItem>
        </div>
      </Menu>
    </Sidebar>
  )
}