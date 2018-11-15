import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import axios from 'axios';

export class App extends Component {
  constructor(props){
    super(props);
    this.state={
      task: '',
      people: [],
      edit_id: '',
      edit_first: '',
      delete_id: ''
    }
  }
  first_nameCatcher = event => {
    this.setState({
      task: event.target.value
    });
  }
  

  createPerson = event => {
    const person = {task: this.state.task, last_name: this.state.last_name}
    axios.post('http://localhost:3000/api/tasks')
    .then (res => {
      console.log(res);
      console.log ({data:person})
    });
  }

  readPeople() {
    axios.get('http://localhost:3000/api/tasks/:id')
      .then(res => {
        console.log(res);
      this.setState({people: res.data})
    });
  }

  edit_idCatcher = event  => {
    this.setState({
      edit_id: event.target.value
    });
  }

  edit_firstCatcher = event => {
    this.setState({
      edit_first: event.target.value
    });
  }


  updatePerson  = event => {
    let person = {
      id: this.state.edit_id,
      task: this.state.edit_first
    }
    axios.post('http://localhost:3000//api/tasks')
      .then (res => {
        console.log(res);
        console.log ({data:person})
    });
  }

  delete_idCatcher = event => {
    this.setState({
      delete_id: event.target.value
    });
  }


  deletePerson = event => {
    axios.delete(`http://localhost:3000//api/tasks/${this.state.deleteId}`)
}

  render() {
    return (
      <div>
      <h1>Crud Application</h1>
        <input onChange={this.first_nameCatcher} type="text" />
        <button onClick={this.createPerson}>Create Task</button>
        
        <br></br>
        <br></br>
        <button onClick={this.readPeople}>Read Task</button>
        {this.state.people.map ((value, index) => {
          return (
            <p key={index}>{value.task} ></p>
        )
        })}
        <br></br>
        <br></br>
      
        <input onChange={this.edit_idCatcher} type="text" />
        <input onChange={this.edit_firstCatcher} type="text" />
        <button onClick={this.updatePerson}>Update Task</button>
        
        <br></br>
        <br></br>

        <input onChange={this.delete_idCatcher} type="text" />
        <button onClick={this.deletePerson}>Delete Task</button>
      </div>
  );
}
}

export default App;
ReactDOM.render(
 <App />,
  document.getElementById('root')
);