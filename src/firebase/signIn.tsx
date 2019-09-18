import * as React from 'react';

import * as firebase from 'firebase/app';

import 'firebase/auth';

import firebaseConfig from './firebaseConfig.js'

import withFirebaseAuth from 'react-with-firebase-auth';

import TicketHomePage from '../ticket-homepage/TicketHomePage';



const firebaseApp = firebase.initializeApp(firebaseConfig)

const firebaseAppAuth = firebaseApp.auth();

const providers ={
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

interface IOwnProps {
    user?: firebase.User;
    signOut: () => void;
    signInWithGoogle: () => void;

}

const AuthLogin: React.FunctionComponent<IOwnProps> = (props) => {
    const { 
        user,
        signOut,
        signInWithGoogle,
    } = props;
    const UserCheck = () => {
        if(user){
            return(
            <>
                <div>
                    Hello, {user.displayName}
                    <TicketHomePage/> 
                </div> 
                <button onClick={signOut}>Sign out</button>
            </>
            )
        }
        else{
            return(
                <>
                    <p>Please sign in.</p>
                    <button onClick={signInWithGoogle}>Sign in with Google</button>
                </>
            ) 
        }

    }
    return (
        <UserCheck/>
    );
}

export default withFirebaseAuth({
    firebaseAppAuth,
    providers,
  })(AuthLogin);