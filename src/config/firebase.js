import * as firebase from "firebase";

import { FirebaseConfig } from "./dev";

if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseConfig);
}

export const db = firebase.database();

const databaseRef = db.ref(); 

export const ticketsRef = databaseRef.child("tickets");

export const notesRef = databaseRef.child("notes");

export const userRef = databaseRef.child("users");

export const messagesRef = databaseRef.child("messages");

