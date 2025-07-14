// import { useState } from 'react'
import { AuthProvider } from './context/AuthProvider.tsx'
import {UsernameContext} from './context/UsernameContext.tsx'
import {LiveSettings} from './context/liveSettings.tsx'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './index.css'
import ProtectedLayout from './components/protected.tsx'
import NotFound from './components/notFound.tsx'
import Index from "./pages"
import Signup from './pages/signup'
import Signin from './pages/signin'
import Categories from './pages/categories'
import Settings from './pages/settings'
import Livesettings from './pages/livesettings'
import Quiz from './pages/quiz.tsx'
import Result from './pages/result.tsx'
import Leaderboard from './pages/leaderboard.tsx'
import Liveoquiz from './pages/LiveQuiz/liveoquiz.tsx'
import Livetquiz from './pages/LiveQuiz/livetquiz.tsx'
import WaitingRoom from './pages/waitingRoom.tsx'
import LiveResult from './pages/LiveResult.tsx'
import { useAuth } from './context/AuthProvider.tsx'
import Loader from './components/loader.tsx'

const AppRoutes=()=>{
  // const {loading}=useAuth()
  // if(loading){
  //   // return <div>Loading........</div>
  // }

  return(


<Routes>
        <Route element={<Index/>} path='/'/>
        <Route element={<Signup/>} path='signup'/>
        <Route element={<Signin/>} path='signin'/>
        {/* PROTECTED LAYOUT */}
        <Route element={<ProtectedLayout/>}>
          <Route element={<Categories/>} path='categories'/>
        <Route element={<Settings/>} path='settings'/>
        <Route element={<Quiz/>} path='quiz'/>
        <Route element={<Result/>} path='result'/>
        <Route element={<Leaderboard/>} path='leaderboard'/>
        <Route element={<Loader/>} path='loader'/>
        {/* LIVE QUIZ ROUTES */}
        <Route element={<Livesettings/>} path='livesettings'/>
        <Route element={<WaitingRoom/>} path='waitingroom'/>
        <Route element={<Liveoquiz/>} path='liveoquiz'/>
        <Route element={<Livetquiz/>} path='livetquiz'/>
        <Route element={<LiveResult/>} path='liveresult'/>
        <Route element={<NotFound/>} path='404'/>
        </Route>
        
      </Routes>
    
  )
}
function App() {
  

  
  return (
    <>
    <AuthProvider>
      <UsernameContext>
        <LiveSettings>
          <Router>
      <AppRoutes/>
    </Router>
        </LiveSettings>
      </UsernameContext>
    </AuthProvider>
    </>
  )
}

export default App
