import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from 'hooks/useAuthContext'

// style
import './Sidebar.css'
import DashboardIcon from 'assets/dashboard_icon.svg'
import AddIcon from 'assets/add_icon.svg'
import Avatar from '@mui/material/Avatar'

export default function Sidebar() {
  const { user } = useAuthContext()
  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        <div className='user'>
          <div className='thumbnail'>
            <Avatar alt="user's thumbnail" src={user.photoURL} sx={{ width: 70, height: 70 }} />
          </div>
          <p>Hey {user.displayName}</p>
        </div>
        <nav className='links'>
          <ul>
            <li>
              <NavLink exact to='/'>
                <img src={DashboardIcon} alt='Dashboard icon' />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/create'>
                <img src={AddIcon} alt='Add new project icon' />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
