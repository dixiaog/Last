import { Button, Radio, Icon, Checkbox, Input  } from 'antd';
import React, { Component } from 'react';

export default class Big extends Component {
    state = {
      show: true,
      text: '自定义'
    };
  
    onChange = () => {
        this.setState({
            show: !this.state.show,
        })
      }

      back= (e) => {
          console.log(e.target.value)
          this.setState({
            text: e.target.value
        })
      }
      
  
    render() {

      const size = this.state.size;
      return (
        <div>
          <Checkbox style={{float:'left'}} onChange={this.onChange}></Checkbox>
          {this.state.show ? <div>{this.state.text}</div> : <Input value={this.state.text} style={{float:'left', width: '100px'}} onChange={this.back} />}
        </div>
      );
    }
  }