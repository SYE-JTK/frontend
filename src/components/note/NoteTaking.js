// eslint-disable-next-line
import React, { Component } from "react";




class NoteTaking extends React.Component {


  constructor(props){
    super(props);

    this.state = {
      items: []
    }

    this.addNote = this.addNote.bind(this);
  }

  addNote(event){
    console.log("working");

    if(this.theTitle.value != ""){
      var newItem = {
        title: this.theTitle.value,
        note: this.theNote.value
      };
    }

    this.setState((prevState) => {
      return{
        items: prevState.items.concat(newItem)
      };
    });

    this.theNote.value = "";
    this.theTitle.value = "";

    console.log(this.state.items)

    event.preventDefault();

  }

  render() {
    return (
      <div>
        <header>
           <h1> Notes </h1>
        </header>
        <div className = "main-content">
          <u1>
            {this.state.items.map( (val) => <li>{val.title}-{val.note}</li>)}
          </u1>
        </div>
        <footer>
          <form onSubmit = {this.addNote}> 
            <input
             type="text"
             placeholder = "Enter note title here"
             ref = {(title) => this.theTitle = title}
             />
            <textarea 
            placeholder = "Enter note here"
            ref = {(note) => this.theNote = note}
            />
            <button type="submit">AddNote</button>
          </form>
        </footer>
      </div> 
    )
  }
}
export default NoteTaking
