// eslint-disable-next-line
import React from "react";
import './components/page_layout/page.css';
import AuthLogin from './components/AuthLogin'
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <AuthLogin/>
      </div>
    )
  }
}
export default App






