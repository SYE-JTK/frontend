import React, { Component } from 'react';
import * as firebase from 'firebase/app';

import { userRef } from "../../config/firebase";

import { Link } from 'react-router-dom';




class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            date: "",
            gender: "",
            smoker: "",
            partier: "",
            avatarURL: "",
            bio: ""

        }

    }


    componentDidMount() {
        this.getUserInformation();
    }

    getUserInformation() {
        const currUser = firebase.auth().currentUser;
        var user = userRef.child(currUser.uid);
        user.on('value', snapshot => {
            this.setState({ name: snapshot.child("name").val() });
            this.setState({ avatarURL: snapshot.child("avatarURL").val() });
            this.setState({ date: snapshot.child("birthday").val()});
            this.setState({ gender: snapshot.child("gender").val() });
            this.setState({ smoker: snapshot.child("smoker").val() });
            this.setState({ partier: snapshot.child("partier").val() });
            this.setState({ bio: snapshot.child("bio").val() });

        });
    }



    render() {
        return (
            <div className="container">
                <h1 className="text-center">{this.state.name}</h1>

                <div className="row text-left">
                    <div className="col-sm">
                        <img
                            className="rounded"
                            src={this.state.avatarURL}
                            onError={(e) => { e.target.onerror = null; e.target.src = "images/not_found.png" }}
                        />
                        
                    </div>
                    <div className="col-sm">
                        <p> Birthday: {this.state.date} <br></br>
                            Gender: {this.state.gender} <br></br>
                            Smoker: {this.state.smoker} <br></br>
                            Partier: {this.state.partier}
                        </p>
                        <div>
                            {this.state.bio}
                        </div>

                    </div>
                </div>
                <div className="text-center">
                    <Link to="/edit-profile" className="btn btn-dark ml-2 mt-3">Edit Profile</Link>
                </div>
            </div>

        )
    }
}

export default ProfilePage;