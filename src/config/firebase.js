import * as firebase from "firebase";

import { FirebaseConfig } from "../config/keys";

if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseConfig);
}

const databaseRef = firebase.database().ref();
export const ticketsRef = databaseRef.child("tickets");