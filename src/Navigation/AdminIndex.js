import React from 'react'
import Login from '../Auth/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard'
import PrivacyPolicy from '../Pages/PrivacyPolicy'
import Commondata from '../Pages/CommonData'
import { authToken } from '../Services/Contexts/Context'
import TermsAndConditions from '../Pages/TermsAndConditions'
import Main from '../Layout/Main'
import Error from '../Pages/Error'
import { OfflineOnlineAlert } from '../Components/OfflineOnlineIndicator'
import HelpAndSupport from '../Pages/HelpAndSupport'
import FeedBack from '../Pages/FeedBack'
import Notification from '../Pages/Notification'
import User from '../Pages/Users/User'
import UserDetails from '../Pages/Users/UserDetails'
import Reports from '../Pages/Reports'
import Level from '../Pages/Level'
import Template from '../Pages/Template'
import Category from '../Pages/Category'



const Adminindex = () => {
    return (
        <>
            {/* Display OfflineOnlineAlert component */}
            <OfflineOnlineAlert />
            <BrowserRouter>
                <Routes>
                    {/* Routes for authenticated users */}
                    <Route path='/login' element={<Login />} />
                    {authToken ?  // Check if authToken exists
                        <Route path='/' element={<Main />} >
                            <Route path='/' element={<Dashboard />} />
                            <Route path='/user' element={<User />} />
                            <Route path='/userdetails/:id' element={<UserDetails />} />
                            <Route path='/level' element={<Level />} />
                            <Route path='/category' element={<Category />} />
                            <Route path='/template' element={<Template />} />
                            <Route path='/commondata' element={<Commondata />} />
                            <Route path='/notification' element={<Notification />} />
                            <Route path='/feedback' element={<FeedBack />} />
                            <Route path='/reports' element={<Reports />} />
                            <Route path='/helpandsupport' element={<HelpAndSupport />} />
                            <Route path='*' element={<Error />} />
                        </Route>
                        :
                        <Route path='*' element={<Login />} /> // Route for non-authenticated users (redirect to Login)
                    }
                    {/* Default route for non-authenticated users (redirect to Login) */}
                    <Route path='*' element={<Login />} />
                    {/* Routes for privacy policy and terms and conditions */}
                    <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                    <Route path='/terms-and-condition' element={<TermsAndConditions />} />
                </Routes>

            </BrowserRouter>
        </>
    )
}

export default Adminindex