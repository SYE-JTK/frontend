import * as React from 'react';
import AuthLogin from '../../firebase/signIn'


const SignInPage: React.FunctionComponent = () => {
  return (
    <div>
      <AuthLogin/>
    </div>
  );
};
export default SignInPage;
