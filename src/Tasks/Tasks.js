import React, { Component } from 'react';
import { Tabs, Button, Icon, Input } from 'antd';
import './tasks.css';

const TabPane = Tabs.TabPane;

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = (localStorage.getItem('todoList'))? JSON.parse(localStorage.getItem('todoList')): {
      todo: [],
      done: []
    };
    this.textInput = React.createRef();
  }

  saveToStorage = () => {
    localStorage.setItem('todoList', JSON.stringify(this.state));
  };

  addTask = () => {
    let value = this.textInput.current.input.value;
    let todo = this.state.todo.slice();
    if (value !== "") {
      todo.push(value);
    }
    this.textInput.current.input.value = "";

    this.setState({
      todo: todo
    }, this.saveToStorage);
  };

  taskStatus = (isTodo, key) => {
    let todo = [...this.state.todo];
    let done = [...this.state.done];

    if (isTodo) {
      done.push(todo[key]);
      todo.splice(key, 1);
    } else {
      todo.push(done[key]);
      done.splice(key, 1);
    }

    this.setState({
      todo: todo,
      done: done
    }, this.saveToStorage);
  };

  deleteTask = (isTodo, key) => {
    if (isTodo) {
      let todo = [...this.state.todo];
      todo.splice(key, 1);
      this.setState({
        todo: todo
      }, this.saveToStorage);
    } else {
      let done = [...this.state.done];
      done.splice(key, 1);
      this.setState({
        done: done
      }, this.saveToStorage);
    }
  };

  render() {
    const todo = this.state.todo.map((item, index) =>
      <div className="list" key={index}>
        <span>{item}</span>
        <Button type="default" htmlType="submit" icon="delete" size="default" onClick={() => this.deleteTask(true, index)}/>
        <Button type="default" htmlType="submit" icon="check-circle-o" size="default" onClick={() => this.taskStatus(true, index)}/>
      </div>
    );
    const done = this.state.done.map((item, index) =>
      <div className="list" key={index}>
        <span>{item}</span>
        <Button type="default" htmlType="submit" icon="delete" size="default" onClick={() => this.deleteTask(false, index)}/>
        <Button type="default" htmlType="submit" icon="check-circle" size="default" onClick={() => this.taskStatus(false, index)}/>
      </div>
    );

    return (
      <div className="card-container">
        <Tabs type="card">
          <TabPane tab={<Icon style={{fontSize: '30px', lineHeight: 2}} type="profile" />} key="1">
            {todo}
          </TabPane>
          <TabPane tab={<Icon style={{fontSize: '30px', lineHeight: 2}} type="schedule" />} key="2">
            {done}
          </TabPane>
        </Tabs>
        <Input type="text" ref={this.textInput} addonAfter={<Button className="add-button" type="primary" htmlType="submit" shape="circle" icon="plus" size="large" onClick={this.addTask}/>} placeholder="Add a task to the list." />
      </div>
    )
  }
}

export default Tasks;