import * as firebase from "firebase";

import { FirebaseConfig } from "./dev";

if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseConfig);
}

const databaseRef = firebase.database().ref(); 

export const ticketsRef = databaseRef.child("tickets");

export const notesRef = databaseRef.child("notes");

export const userRef = databaseRef.child("users");

export const userRef = databaseRef.child("messages");
