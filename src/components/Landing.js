import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import { useRouter } from '../router';
import Navbar from './Navbar';
import '../App.css';
import Footer from './Footer';
import Buffer from './Buffer';
function Landing(props){
    const auth = useAuth();
    const router = useRouter();
    const logout = e => {
        auth.logout()
    }

    useEffect(() => {
        if(!auth.isLoggedIn()){
            router.replace('/');
        }
    }, [auth]);

    return(
        <div>
           <Navbar/>
            <div className="container-fluid landing">
                <div className="bg">
                        <div className="columns">
                            <div className="columns is-desktop">
                                <div className="column is-5 banner-content">
                                    <h1>Emergidrone</h1>
                                    <h2>A emergency drone service system.</h2>
                                </div> 
                            </div>                            
                        </div>
                </div>
            </div>
            <Buffer/>
           <Footer/>
       </div>
        
    );
}



export default Landing;