import React, { Component } from 'react';

class TodoAdder extends Component {

    constructor(props) {
        super(props);
    }

    onButtonClick(e) {
        const newItem = {
            done: false,
            text: document.getElementById('create-todo-text').value,
        };
        let select = document.getElementById('create-todo-priority');
        newItem.priority = select[select.selectedIndex].value;
        this.props.onAddItem(newItem);
    }


    render() {
        return (
            <div className='card'>
                <div className='card-title'>
                    <p><b>Add New Todo</b></p>
                </div>
                <label>
                    <b>I want to..</b>
                    <textarea className="create-todo-text" id="create-todo-text"/>
                </label>
                <label>
                    <b>How much of a priority is this?</b>
                    <select className="create-todo-priority" id="create-todo-priority">
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                    </select>
                </label>

                <button className="btn btn-success create-todo" onClick={this.onButtonClick.bind(this)}>Add</button>

            </div>


        );
    }

   

}

export default TodoAdder;