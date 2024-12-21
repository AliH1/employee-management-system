import { useState } from 'react';
import { Sidebar, Menu, MenuItem, sidebarClasses} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

export default function SideBar(){
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className='sidebar-container'>
      <Sidebar style={{height: '100vh'}}
      collapsed={collapsed}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: '#353839',
        },
      }}>
        <Menu style={{color: 'white', fontSize: '18px'}} menuItemStyles={{
          button: {
            '&:hover':{
              backgroundColor: 'black'
            }
          }
        }}>
          <div style={{marginBottom: '1rem'}}>
            <MenuItem style={{textAlign: 'center'}} icon= {<MenuIcon />} onClick={() => handleToggleSidebar()}>Admin</MenuItem>
          </div>
          <MenuItem icon= {<GroupIcon/>} component={<Link to="/calendar" />}>Employee List</MenuItem>
          <MenuItem icon= {<QuestionAnswerIcon/>} component={<Link to="/Login" />}>Employee Requests</MenuItem>
          <MenuItem icon= {<LogoutIcon/>} component={<Link to="/e-commerce" />}>Logout</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}