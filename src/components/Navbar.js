import React,{useEffect, useState} from 'react';
import { useAuth } from '../auth';
import { useRouter } from '../router';
import { useDb } from '../db';
import classnames from 'classnames';

function Navbar(props){
    const auth = useAuth();
    const router = useRouter();
    const db = useDb();

    const login = e => {
        router.push('/');
    }
    const logout = e => {
        auth.logout();
    }
    const [show_login,toggleShow] = useState(true);
    useEffect(() =>{
        if(auth.isLoggedIn()){  
            toggleShow(false);
        }
    },[auth])

    return(
        <nav className="navbar is-transparent">
        <div className="navbar-brand">
        <a className="navbar-item" href="https://emergidrone.com">
            <img src="https://res.cloudinary.com/githigi-tech/image/upload/v1581684565/emergidrone/default-monochrome-black_wb9mel.svg" alt="" width="150" height="30"/>
        </a>
        <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
        </div>
        </div>

        <div id="navbarExampleTransparentExample" className="navbar-menu">
        <div className="navbar-start">
            <a className="navbar-item" href="https://emergidrone.com">
            Home
        </a>
        </div>
    </div>

    <div className="navbar-end">
        <div className="navbar-item">
        <div className="field is-grouped">
            <p className="control">
           {<a className="button" onClick={show_login?login:logout}>
                <span className="icon">
                <i className={classnames("fas fa-sign-",show_login?"in-alt":"out-alt")}></i>
                </span>
                <span>
               {show_login?"Login":"Logout"}
                </span>
            </a>}
            </p>
        </div>
        </div>
    </div>
</nav>
    )
}
export default Navbar;