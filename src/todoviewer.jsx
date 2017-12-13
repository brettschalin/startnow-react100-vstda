import React, { Component } from 'react';

class TodoViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentlyEditing: null, //ID of element loaded into the textarea

        };
    }

    onEditSaveClick(e) {

        
        let newItem = {
            text: document.getElementById('update-todo-text').value,
        };
        let select = document.getElementById('update-todo-priority');
        newItem.priority = select[select.selectedIndex].value;
        this.setState({currentlyEditing: null});
        for (let i = 0; i < this.props.todos.length; i++) {
            if (this.props.todos[i].id == this.state.currentlyEditing) {
                this.props.onEditItem(i, newItem);
                return;
            }
        }
    }

    handleDelete(id) {
        for (let i = 0; i < this.props.todos.length; i++) {
            if (this.props.todos[i].id == id) {
                return function () {
                    this.props.onEditItem(i, null);
                }
            }
        }

    }

    handleEdit(id) {
        for (let i = 0; i < this.props.todos.length; i++) {
            if (this.props.todos[i].id == id) {
                return function () {
                    this.setState({currentlyEditing: this.props.todos[i].id})
                    document.getElementById("update-todo-text").value = this.props.todos[i].text;
                }
            }
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-title">
                    <p><b>View Todos</b></p>
                </div>
                <div className={(this.state.currentlyEditing == null) ? "invisible" : ""}>
                    <label>
                        <b>Description</b>
                        <textarea className="update-todo-text"
                            id="update-todo-text" />
                    </label>
                    <br />
                    <label>
                        <b>Priority</b>
                        <select className="update-todo-priority" id="update-todo-priority">
                            <option value="1">Low</option>
                            <option value="2">Medium</option>
                            <option value="3">High</option>
                        </select>
                    </label>
                    <br />
                    <button className="update-todo btn btn-success" onClick={this.onEditSaveClick.bind(this)}>Save</button>
                    <br />
                </div>
                <ul className="list-group">
                    {this.props.todos.map((todo) => (
                        <li className="list-group-item " key={todo.id}
                        className = {todo.priority==1?"bg-success":(todo.priority==2?"bg-warning":"bg-danger")}>
                            {todo.text}

                            <a className="delete-todo" onClick={this.handleDelete(todo.id).bind(this)}>Delete</a>
                            <a className="edit-todo" onClick={this.handleEdit(todo.id).bind(this)}>Edit</a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TodoViewer;