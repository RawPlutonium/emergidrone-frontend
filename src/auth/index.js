import React, {createContext, useContext, useState, useEffect} from 'react';
import {UserPasswordCredential, UserPasswordAuthProviderClient} from 'mongodb-stitch-browser-sdk';
import initializeApp from '../app';
import { trackPromise } from 'react-promise-tracker';

export const authContext = createContext();
export const ProvideAuth = ({children}) => <authContext.Provider value={useProvideAuth()}>{children}</authContext.Provider>
export const useAuth = () => useContext(authContext);


function useProvideAuth(){
    const [user, setUser] = useState(null);
    const {client} = initializeApp();


    const isLoggedIn = () => client.auth.isLoggedIn;
    const login = (email, password) => {
        const credentials = new UserPasswordCredential(email, password);
        return trackPromise(client.auth.loginWithCredential(credentials), 'login_user')
    }
    const logout = () => client.auth.logout();
    //register users
    const register = (email, password) => {
        const emailPassClient = client.auth.getProviderClient(UserPasswordAuthProviderClient.factory);

        return trackPromise(emailPassClient.registerWithEmail(email, password), 'register_user');
    }
    //subscribe to auth state changes
    useEffect(() => {
        if(client.auth.hasRedirectResult()){
            client.auth.handleRedirectResult()
                .then(() => console.log("Redirect with auth"))
                .catch(console.error);
        }
        //auth listeners
        const listeners = {
            onUserLoggedIn: (auth, user) => setUser(user),
            onUserLoggedOut: (auth, user) => setUser(null)
        }
        client.auth.addAuthListener(listeners);

        if(client.auth.isLoggedIn){
            setUser(client.auth.user);
        }else{
            setUser(null);
        }
        return () => client.auth.removeAuthListener(listeners);
    }, [user])

    return {
        isLoggedIn,
        login,
        user,
        register,
        logout,
        client
    }
}


