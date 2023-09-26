import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Registration } from './page/Auth/Registration'
import { Login } from './page/Auth/Login'
import { Tasks } from './page/Tasks'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Tasks />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])
function App() {
  return <RouterProvider router={router} />
}

export default App
