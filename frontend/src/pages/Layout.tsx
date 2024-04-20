// Importing the Outlet component from 'react-router-dom' which is used for rendering child components of the current route
import { Outlet } from 'react-router-dom';
// Importing the Header component from the components directory
import Header from '../components/Header';
import HeaderLoggedIn from '../components/HeaderLoggedIn';
import { useEffect, useState } from 'react';
import HeaderManager from '../components/HeaderManager';
import { GetAccountResult } from '../types/account';
import { SDKState, useAccount, useSDK } from '@metamask/sdk-react-ui';

// Defining the Layout component responsible for rendering the overall layout structure of the application
export default function Layout({account, resident} : {account:SDKState; resident: any}) {
    
    if(resident != null){
        useEffect(() => {

        }, [resident.isManager])
    }
    
    return (
        // Container div for the entire layout
        <div className='p-0 w-[100vw] md:h-[100vh] md:flex md:flex-col lg:h-[100vh] lg:flex lg:flex-col overflow-y-auto overflow-x-hidden relative'>
            {/* Rendering the Header component */}
            {account.connected ?
                (resident.isManager ? <HeaderManager /> : <HeaderLoggedIn resident={resident}/>) :
                (<Header />)                
            }
            {/* Rendering the child components of the current route */}
            <Outlet />
        </div>
    )
}