import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import AdminDashboard from './pages/AdminDashBoardPage'
import './index.css'
import AssessmentFormPage from './pages/AssessmentFormPage.jsx'
const router  = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/admindashboard",
    element:<AdminDashboard/>
  },
  {
    path:"/assessmentPage",
    element:<AssessmentFormPage/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)


