import React, { Component } from 'react';
import TodoAdder from './todoadder';
import TodoViewer from './todoviewer';

//TODO: (ironically the app that's being built would be helpful for building the app)
//handle edit buttons
//add classnames to the elements based on priority
//test everything


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      /* each entry has the following properties:
      {
        text: string,
        priority: [int in range(1,3) inclusive],
        id: int
        done: boolean
      }
       */
      todos: [],
    };
  }

  //returns a simple hash of the todo description
  //should be unique as it involves the current timestamp
  //taken from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
  getNewID(item) {
    let idStr = Date.now().toString() + item.text;
    let id = 0;
    if (idStr.length == 0) return id;
    for (let i = 0; i < idStr.length; i++) {
      let char = idStr.charCodeAt(i);
      id = ((id<<5)-id)+char;
      id = id & id; // Convert to 32bit integer
    }
    return id;


  }

  handleAddItem(item) {
 
    if (this.state.todos.length) {
      item.id = this.getNewID(item);
    }
    else {
      item.id = 1;
    }

    this.setState({ todos: [...this.state.todos, item] })
  }


  //Can either edit or delete an item
  handleEditItem(index, newItem) {
    const newTodos = [...this.state.todos];
    //replace item with newItem if it has a value...
    if (!!newItem) {
       if (this.state.todos.length) {
        newItem.id = this.getNewID(newItem);
      }
      else {
        newItem.id = 1;
      }
      newTodos[index] = newItem;
    }
    //otherwise delete it
    else {
      newTodos.splice(index, 1);
    }
    this.setState({ todos: newTodos });
  }

  render() {
    return (
      <div className='container'>
        <div className="title-container">
          <h2> Very Simple Todo App</h2>
          <h5> Track all of the things </h5>
          <hr />
        </div>
        <div className="body">
          <div className="row">
            <div className="col-4">
              <TodoAdder onAddItem={this.handleAddItem.bind(this)} />
            </div>
            <div className="col-8">
              <TodoViewer todos={this.state.todos} onEditItem={this.handleEditItem.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
