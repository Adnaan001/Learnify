import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router'
import { Home } from './pages/Home'
import Nav from './components/Navbar/Nav'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { VerifyEmail } from './pages/VerifyEmail'
import { Dashboard } from './pages/dashboard/Dashboard'
import { ResetPassword } from './pages/forgotPassword/ResetPassword'
import { ForgotPassword } from './pages/forgotPassword/ForgotPassword'
import { ResetConfirmation } from './pages/forgotPassword/ResetConfirmation'
import { AboutUs } from './pages/AboutUs'
import { ContactUS } from './pages/ContactUs'
import { OpenRoute } from './components/Common/OpenRoute'
import { PrivateRoute } from './components/Common/PrivateRoute'
import { MyProfile } from './pages/dashboard/MyProfile'
import { EnrolledCourses } from './pages/dashboard/EnrolledCourses'
import { Cart } from './pages/dashboard/Cart'
import { Settings } from './pages/dashboard/Settings'
import { useSelector } from 'react-redux'
import { IndexAddCourse } from './pages/dashboard/instructor/addCourse/Index'
import { Error } from './pages/Error'
import IndexMyCourses from './pages/dashboard/instructor/myCourses/Index'
import { CatalogPage } from './pages/catalog/CatalogPage'
import { CourseDetails } from './pages/courseDetailsPage/CourseDetails'
import { ViewCourse } from './pages/view-course/ViewCourse'
import { VideoDetails } from './components/View-Course/VideoDetails'
import { InstructorDashboard } from './pages/dashboard/instructor/dashboard/InstructorDashboard'

function App() {

  const {user}=useSelector((state)=>state.profile);
  console.log("user.accountType==>",user?.accountType);

  return (
    <div className='w-screen h-screen p-[0.1px]'>
      <Nav/>  
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route path='/contact-us' element={<ContactUS/>}/>

        <Route path='/login' element={<OpenRoute> <Login/> </OpenRoute>}/>

        <Route path='/signup' element={<OpenRoute> <Signup/> </OpenRoute>}/>
        <Route path='/signup/verify-email' element={<OpenRoute> <VerifyEmail/> </OpenRoute>}/>  

        <Route path='/resetpassword' element={<OpenRoute> <ForgotPassword/> </OpenRoute>}/>
        <Route path='/resetpassword/:token' element={<OpenRoute> <ResetPassword/> </OpenRoute>}/>
        <Route path='/resetconfirmation' element={<OpenRoute> <ResetConfirmation/> </OpenRoute>}/>
        
        <Route path='/catalog/:category' element={<CatalogPage/>}/>
        <Route path='/course/:courseid' element={<CourseDetails/>}/>

        <Route element={<PrivateRoute> <Dashboard/> </PrivateRoute>}>
          <Route path='/dashboard/my-profile' element={<PrivateRoute> <MyProfile/> </PrivateRoute>}/>
          {
            user?.accountType==="Student"
            &&
            <Route path='/dashboard/cart' element={<PrivateRoute> <Cart/> </PrivateRoute>}/>
          }
          {
            user?.accountType==="Student"
            &&
            <Route path='/dashboard/enrolled-courses' element={<PrivateRoute> <EnrolledCourses/> </PrivateRoute>}/>
          }
          <Route path="/dashboard/settings" element={<PrivateRoute> <Settings/> </PrivateRoute>}/>
          {
            user?.accountType==="Instructor"
            &&
            <Route path='/dashboard/add-course' element={<PrivateRoute> <IndexAddCourse/> </PrivateRoute>}/>            
          }
          {
            user?.accountType==="Instructor"
            &&
            <Route path='/dashboard/instructor' element={<PrivateRoute> <InstructorDashboard/> </PrivateRoute>}/>
          }
          {
            user?.accountType==="Instructor"
            &&
            <Route path='/dashboard/my-courses' element={<PrivateRoute> <IndexMyCourses/> </PrivateRoute>}/>
          }
        </Route>     
        <Route element={<PrivateRoute> <ViewCourse/> </PrivateRoute>}>
          {
            user?.accountType==="Student"
            && (
                <Route 
                path='/view-course/:courseId/section/:sectionId/subSection/:subSectionId' 
                element={<PrivateRoute> <VideoDetails/> </PrivateRoute>}
              />
            )
          }
        </Route>                                     
        <Route path='*' element={<Error/>}/>
      </Routes>       
    </div>
  )
}

export default App
