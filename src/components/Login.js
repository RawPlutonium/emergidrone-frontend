import React, {useState, useEffect} from 'react';
import { useAuth } from '../auth';
import { withRouter } from 'react-router-dom';
import { useRouter } from '../router';
import { useDb } from '../db';


function Login(props){
    const auth = useAuth();
    const router = useRouter();
    const db = useDb();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = e => {
        e.preventDefault();
        auth.login(email, password)
    }
    useEffect(() =>{
        if(auth.isLoggedIn()){
          const {state} = router.location;

          if(state && state.user){
            db.usersDb.save(state.user);
          }
          
          router.push('/landing')
        }
    },[auth])


    return(
        <div>   
          <form onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input onChange={(e) => setEmail(e.target.value )}type="email" className="form-control mt-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input onChange={(e) => setPassword(e.target.value )} type="password" className="form-control  mt-2" id="exampleInputPassword1" placeholder="Password"/>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input mt-2" id="remember"/>
            <label className="form-check-label" htmlFor="remember">Remember Me</label>
          </div>
          <div className="mt-2">
              <button type="submit" className="mt-4 btn btn-primary btn-outline-dark">Submit</button>
          </div>
        </form>
        </div>

)
}

export default withRouter(Login);