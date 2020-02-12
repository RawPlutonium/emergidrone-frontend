import React, {useState} from 'react';
import { useAuth } from '../auth';
import { useRouter } from '../router';
import { useDb } from '../db';
import { usePromiseTracker } from 'react-promise-tracker';
import classNames from 'classnames';

function Register(props){
    const auth = useAuth();
    const router = useRouter();
    const db = useDb();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [name, setName ] = useState('');;

    //error handling
    const [error, setError] = useState({email: null, password: null, confirmPass: null, name: null, form: null});

    const registerUser = e => {
        e.preventDefault();
        //implement validation logic
        if(password !== confirmPass){
            return setError({confirmPass: "Password mismatch"});
        }

        auth.register(email, password)
            .then(() => {
                //add other user info to the DB
                const user = {
                    email,
                    name,
                }
                
                router.push({
                    pathname: '/',
                    state: user
                });
            }).catch(console.error);
    }

    const isLoading = usePromiseTracker({area: 'register_user'}).promiseInProgress;

    return (
        <div className="register_area">
            <form onSubmit={registerUser}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onChange={(e) => setEmail(e.target.value )} value={email} type="email" className="form-control mt-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={(e) => setPassword(e.target.value )} value={password} type="password" className="form-control  mt-2" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input onChange={(e) => setConfirmPass(e.target.value )} value={confirmPass} type="password" className="form-control  mt-2" id="exampleInputPassword1" placeholder="Confirm Password"/>
                    {error.confirmPass && <p className="help is-danger">{error.confirmPass}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Name</label>
                    <input onChange={(e) => setName(e.target.value )} value={name} type="text" className="form-control  mt-2" id="exampleInputPassword1" placeholder="Name"/>
                </div>
                <div className={classNames("button is-medium is-primary", isLoading && 'is-loading')} onClick={registerUser}>Submit</div>
                <div className="field">
                    {error.form && <p className="help is-danger">{error.form}</p>}
                </div>
            </form>
        </div>
    )
}

export default Register;