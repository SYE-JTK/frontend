import { notesRef } from "../config/firebase";

export const addNotes = newNote => async dispatch => {
    notesRef.push().set(newNote);
}

export const fetchNotes = () => async dispatch => {
    notesRef.on("value", snapshot => {
        dispatch({
            type: 'FETCH_NOTES',
            payload: snapshot.val()
        });
    });
};
