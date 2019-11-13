// eslint-disable-next-line
import React from "react";
import './components/page_layout/page.css';
import AuthLogin from './components/AuthLogin'


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






