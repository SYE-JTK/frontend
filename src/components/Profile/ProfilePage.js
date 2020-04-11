import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import { Link } from 'react-router-dom';

import { getUserInfoCard } from '../../utils/getUserInfoCard';

class ProfilePage extends Component {


    render() {
        return (
            <div className="container">
                <div>
                    {getUserInfoCard(firebase.auth().currentUser.uid)}
                </div>
                <div className="text-center">
                    <Link to="/edit-profile" className="btn btn-dark ml-2 mt-3">Edit Profile</Link>
                </div>
            </div>
        )
    }
}

export default ProfilePage;
