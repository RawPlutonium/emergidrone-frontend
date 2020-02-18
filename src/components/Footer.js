import React from 'react';
import Buffer from './Buffer';

function Footer(props){
    let year = new Date().getFullYear();
    return(
    <footer class="footer">
    <div className="container">
        <div className="columns">
            <div className="column is-3">
                <ul>
                    <li className="has-text-black">info@emergidrone.com</li> <br/>
                    <li className="has-text-black">+254795877416</li><br/>
                    <li className="has-text-black">P.O BOX 10000 </li><br/>
                    <li className="has-text-black">Nairobu, Kenya</li>
                </ul>
            </div>
            <div class="has-text-centered column is-6">
                <p>&#9400;<strong>Emergidrone</strong>  {year}</p>
            </div>
        </div>
    </div>
</footer>
    )
}

export default Footer;