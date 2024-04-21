import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Overview from './pages/Overview'
import Reports from './pages/Reports'
import Requests from './pages/Requests'
import Events from './pages/Events'
import ManagerLogin from './pages/ManagerLogin'
import ManagerWalletConnect from './pages/ManagerWalletConnect'
import ManagerBuildingInfo from './pages/ManagerBuildingInfo'
import { ManagerSignupInfo } from './types/managerSignupInfo'
import { useEffect, useState } from 'react'
import ManagerOwnersInfo from './pages/ManagerOwnersInfo'
import ManagerOverview from './pages/ManagerOverview'
import ManagerReports from './pages/ManagerReports'
import Dashboards from './pages/Dashboards'

import {useSDK} from "@metamask/sdk-react-ui";
import Home2 from './pages/Home2'

function App() {
  const account = useSDK()

  const [manager, setManager] = useState<ManagerSignupInfo | null>(null);

  const [resident, setRedisent] = useState<any>(null)
 
  useEffect(() => {
    const newManager : ManagerSignupInfo = {
      buldingName: "oi",
      numberUnits: 0,
      residents: []
    }
    const loggedIn = {
      loggedInResident: null,
      exists: false,
      isManager: false
    }

    setRedisent(loggedIn)
    setManager(newManager)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout resident={resident} account={account}/>}>
          <Route path="/" element={<Home account={account} />} />
          <Route path="/login" element={<Login resident={resident} account={account} />} />
          <Route path="/signup" element={<SignUp resident={resident}/>} />
          <Route path="/overview" element={<Overview resident={resident} account={account} />} />
          <Route path="/reports" element={<Reports account={account} />} />
          <Route path="/requests" element={<Requests account={account} />} />
          <Route path="/dashboards" element={<Dashboards />} />
          <Route path="/manager" element={<ManagerLogin account={account} />} />
          <Route path="/manager/signup/1" element={<ManagerWalletConnect account={account} />} />
          <Route path="/manager/signup/2" element={<ManagerBuildingInfo info={manager} account={account} />} />
          <Route path="/manager/signup/3" element={<ManagerOwnersInfo info={manager} account={account} />} />
          <Route path="/manager/overview" element={<ManagerOverview resident={resident} account={account} />} />
          <Route path="/manager/reports" element={<ManagerReports account={account} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
