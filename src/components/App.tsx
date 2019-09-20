
import * as React from 'react';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import LandingPage from './Landing/LandingPage';
import Navigation from './Navigation/index';
import SignInPage from './SignIn/SignInPage';


// import SignUpPage from '../SignUp';
// import PasswordForgetPage from '../PasswordForget';
// import HomePage from '../Home';
// import AccountPage from '../Account';
// import AdminPage from '../Admin';

import * as ROUTES from '../constants/routes';

const App = () => (
  <Router>
    <div>
      <Route exact={ true } path={ ROUTES.LANDING } component={ LandingPage } />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />

      {/* <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
      <Navigation />
    </div>
  </Router>
);

export default App;

// import * as React from 'react';
// import './App.css';
// import Navigation from './Navigation/index'

// // import AuthLogin from '../firebase/signIn'

// import { BrowserRouter as Router } from 'react-router-dom';


// class App extends React.Component {
//   public render() {
//     return (
//       <div className="App">
//         <Router>
//           <Navigation />
//         </Router>
//         {/* <AuthLogin/> */}
//       </div>
//     );
//   }
// }

// export default App;
