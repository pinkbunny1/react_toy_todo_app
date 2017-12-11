import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// let tasksList = ["Make ToDo List App", "Clean room", "Make Android App"];

class ListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: '',
      taskList: []
    }

    this.addItemToList = this.addItemToList.bind(this);
    this.updateUserInputVal = this.updateUserInputVal.bind(this);
    this.removeCheckedTask = this.removeCheckedTask.bind(this);
  }

  // Input onChange Event handler
  updateUserInputVal(newValue) {
    this.setState({
      userInput: newValue
    })
  }

  // Button onClick Event handler
  addItemToList() {
    // Update list in states:
    // 1. Make a copy of it
    // 2. Add a new item to the copy of array
    // 3. setState the copy to the original state

    let newTask = this.state.userInput
    console.log("Parent Func: Adding a new task to the Task List !")
    console.log("newTask(this.state.userIntput):", newTask)
    let taskArr = this.state.taskList
    if (newTask.length !== 0) {
      taskArr.push(newTask)

      this.setState({
        taskList : taskArr,
        userInput : ''
      })
    }

  }

  removeCheckedTask(task) {
    let taskListCopy = this.state.taskList

    const index = taskListCopy.indexOf(task);
    taskListCopy.splice(index, 1);
    setTimeout(
      () => {
          this.setState({
          taskList: taskListCopy
        })
      }, 300
    )

    console.log("task list:", taskListCopy)

  }

  render() {
    return (
      <div className="App">
        <h3>Add Task for To Do List</h3>
        <InputBar
          userInputProp={this.state.userInput}
          handleInputchange = {this.updateUserInputVal}
          addItem = {this.addItemToList}
        />
        <SubmitBtn
          addItem={this.addItemToList}
        />
        <ListDisplayContainer
          tasksProp={this.state.taskList}
          checkBoxHandler={this.removeCheckedTask}
        />
      </div>
    );
  }
}

export default ListContainer;

// First Child
// class AddContainer extends Component {
//   constructor(props) {
//     super(props);
//
//     this.handleInputChange = this.handleInputChange.bind(this);
//   }
//
//   handleInputChange() {
//
//   }
//   render() {
//     const userInputProp = this.props.userInputProp
//
//     return (
//       // <div class="col-md-8">
//         <form className="form-inline TaskAdder">
//           <div className="form-group">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Type Task"
//               onChange={this.userInputHandler}
//               value={userInputProp}
//             />
//
//             <button
//               type="submit"
//               className="btn btn-default addBTN"
//               onClick={this.submitHandler}
//             >ADD</button>
//           </div>
//         </form>
//       // </div>
//     )
//   }
// }

// Child of First Child
class InputBar extends Component {
  constructor(props) {
    super(props);

    this.userInputHandler = this.userInputHandler.bind(this);
    this.keyPressed = this.keyPressed.bind(this);

  }

  userInputHandler(e) {
    // console.log("Input on Change:",e.target.value)
      this.props.handleInputchange(e.target.value)

  }

  keyPressed(e) {
    // console.log("keypressed", e.key)
    if (e.key === 'Enter') {
      console.log("Enter is pressed")
      this.props.addItem()
    }
  }


  render() {
    const inputVal = this.props.userInputProp;

    return (
      <input
        type="text"
        className="form-control"
        placeholder="Type Task"
        onChange={this.userInputHandler}
        onKeyPress={this.keyPressed}
        value={inputVal}
      />
    )
  }
}

// Child of First Child
class SubmitBtn extends Component {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this)
  }
  submitHandler() {
    console.log("Child func: Submit Button onClick is detected !")
    this.props.addItem()
  }
  render() {
    return (
      <button
        type="submit"
        className="btn btn-default addBTN"
        onClick={this.submitHandler}
      >ADD</button>
    )
  }
}

// Second Child
class ListDisplayContainer extends Component {
  constructor(props) {
    super(props)

    this.passChecker = this.passChecker.bind(this)
  }

  passChecker(task) {
    console.log("passChecker")
    this.props.checkBoxHandler(task)
  }
  render() {
    // any calculations
    let tasksList = this.props.tasksProp
    let rows = []
    let outputTable;
    // console.log("length of task list:", tasksList, tasksList.length)
    if (tasksList.length !== 0) {
      tasksList.forEach((task) => {
        rows.push(<ListRow key={task} task={task} handleBoxChecker={this.passChecker}/>)
      });

      outputTable = <table className="centerTable">
        <thead>
          <tr>
            <th>Task</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    }
    else {
      outputTable =
        <div>
          <h2>No Tasks</h2>
          <p>Please Add tasks</p>
        </div>

    }



    return (

        outputTable

    )
  }
}

// Child of Second Child
class ListRow extends Component {
  constructor(props) {
    super(props)

    this.checkedBox=this.checkedBox.bind(this)

  }

  checkedBox(){
    let task = this.props.task
    console.log("checked")
    console.log("checked key value:", task)
    this.props.handleBoxChecker(task)
  }
  render() {
    let task = this.props.task

    return (

        <tr>
          <td style={{float:"left"}}>{task}</td>
          <td><input id="checkBox" type="checkbox" onChange={this.checkedBox}/></td>
        </tr>


    )
  }
}

// // Child of Child of Second Child
// class TaskTitle extends Component {
//   render() {
//     return (
//       <p style={{color:"red"}}>{this.props.task}</p>
//     )
//   }
// }
//
// // Child of Child of Second Child
// class CheckBox extends Component {
//   render() {
//     return (
//       <input id="checkBox" type="checkbox" />
//     )
//   }
// }
