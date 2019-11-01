// eslint-disable-next-line
import React, { Component } from "react";

import '../ticketHomePage.css';
import '../page_layout/page.css';



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

    if(this.theTitle.value !== ""){
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
        <div className = "main-content margin-b-3">
          <u1>
            {this.state.items.map( (val) => <li>{val.title}-{val.note}</li>)}
          </u1>
        </div>
        <footer>
          <form onSubmit = {this.addNote}> 
            <input
              className='input-main margin-b-2'
              type="text"
              placeholder = "Enter note title here"
              ref = {(title) => this.theTitle = title}
            /><br/>
            <textarea
              className='textarea-main margin-b-2' 
              placeholder = "Enter note here"
              ref = {(note) => this.theNote = note}
            /><br/>
            <button className='button-main' type="submit">Add Note</button>
          </form>
        </footer>
      </div> 
    )
  }
}
export default NoteTaking
