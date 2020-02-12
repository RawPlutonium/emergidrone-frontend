import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import { useRouter } from '../router';
import { useDb } from '../db';
import classNames from 'classnames';

function Landing(props){
    const auth = useAuth();
    const router = useRouter();
    const db = useDb();
    const [showModal, setShowModal] = useState(true);

    const logout = e => {
        auth.logout()
    }

    useEffect(() => {
        if(!auth.isLoggedIn()){
            router.replace('/');
        }
    }, [auth]);

    useEffect(() => {
        const user = auth.client.auth.user;
        const {id: _id} = user;

        const exists = db.usersDb.exists(_id);
        exists.then((user) => {
            if(!user && showModal){
                setShowModal(true)
            }else{
                setShowModal(false);
            }
        })

    }, [auth, db]);

    //close modal
    const closeModal = e => setShowModal(false)

    return(
    <div className="container">
        {
            showModal && <IntroModal onClose={closeModal} shown={showModal}/>
        }
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
            <h1 className="title"> Emergidrone </h1>
                <p>Medical drone provider.</p>
                <button className="btn btn-primary" onClick={logout}>Logout</button>
            </div>
            <div className="col-md-3"></div>
        </div>
    </div>
    );
}


function IntroModal({onClose, shown}){
    return (
        <div className={classNames("modal", shown && 'is-active')}>
            <div className="modal-background"></div>
            <div className="modal-content">
                Form to get input
            </div>
            <button className="modal-close" aria-label="close" onClick={onClose}></button>
        </div>
    )
}

export default Landing;