import React from 'react';

function Navbar(props){
    return(
        <nav className="navbar mb-6 has-background-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
             <a className="navbar-item" href="https://bulma.io">
                    <h1 className="title has-text-danger">EmergiDrone</h1>
             </a>

            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        </nav>
    )
}
export default Navbar;