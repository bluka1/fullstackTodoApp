import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Welcome from './Welcome';
import NotFound from './NotFound';
import './TodoApp.css';
import ListTodos from './ListTodos';
import Header from './Header';
import Logout from './Logout';
import AuthContextProvider from './security/AuthContext';
import AuthenticatedRoute from './AuthenticatedRoute';
import Todo from './Todo';

const TodoApp = () => {
  return (
    <div className="todoApp">
      <AuthContextProvider>
        <BrowserRouter>
          <Header />
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/login' element={<Login />} />
              <Route path='/welcome/:username' element={<AuthenticatedRoute><Welcome /></AuthenticatedRoute>} />
              <Route path='/todos' element={<AuthenticatedRoute><ListTodos/></AuthenticatedRoute>} />
              <Route path='/todo/:id' element={<AuthenticatedRoute><Todo /></AuthenticatedRoute>} />
              <Route path='/logout' element={<AuthenticatedRoute><Logout /></AuthenticatedRoute>} />
              <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  )
}

export default TodoApp