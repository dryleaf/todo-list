import React, { Component } from 'react';
import { Tabs, Button, Icon, Input } from 'antd';
import './tasks.css';

const TabPane = Tabs.TabPane;

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      done: []
    };
    this.textInput = React.createRef();
  }

  addItem = () => {
    let value = this.textInput.current.input.value;
    let todo = this.state.todo.slice();
    todo.push(value);
    this.textInput.current.input.value = "";

    this.setState({
      todo: todo
    });
  };

  removeTask = () => {

  };

  render() {
    const todo = this.state.todo.map((item, index) =>
      <p key={index}>{item}</p>
    );
    const done = this.state.done.map((item, index) =>
      <p key={index}>{item}</p>
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
        <Input type="text" ref={this.textInput} addonAfter={<Button className="add-button" type="primary" htmlType="submit" shape="circle" icon="plus" size="large" onClick={this.addItem}/>} placeholder="Add a task to the list." />
      </div>
    )
  }
}

export default Tasks;