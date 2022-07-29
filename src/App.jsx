import Nav from 'components/Nav'
import DashBoard from 'pages/dashboard'
import Login from 'pages/login'
import Project from 'pages/project'
import Signup from 'pages/signup'
import Create from 'pages/create'
import Sidebar from 'components/Sidebar'
import OnlineUsers from 'components/OnlineUsers'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useAuthContext } from 'hooks/useAuthContext'

// style
import './App.css'

export default function App() {
  const { user, isUserInit } = useAuthContext()

  return (
    isUserInit && (
      <div className='App'>
        <BrowserRouter>
          {user && <Sidebar />}
          {user && <OnlineUsers />}
          <div className='container'>
            <Nav />
            <Switch>
              <Route exact path='/'>
                {user ? <DashBoard /> : <Redirect to='/login' />}
              </Route>
              <Route path='/login'>{!user ? <Login /> : <Redirect to='/' />}</Route>
              <Route path='/signup'>{!user ? <Signup /> : <Redirect to='/' />}</Route>
              <Route path='/create'>{user ? <Create /> : <Redirect to='/login' />}</Route>
              <Route path='/project/:id'>{user ? <Project /> : <Redirect to='/login' />}</Route>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  )
}
