import { Tree, Input, Button, Dropdown, Icon, Menu, message, Select, Form  } from 'antd';
import React, { Component } from 'react';
import Add from './Add'
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const Option = Select.Option;

// const x = 3;
// const y = 2;
// const z = 1;
const gData =  [{
  title: '标准111111',
  key: '1',
  children: [{
    title: '宾客', key: '6',
  }],
}, {
  title: '分销',
  key: '2',
  children: [{
    title: '雪中飞一级', key: '7',
  }],
}, {
  title: '仓储',
  key: '3',
  children: [{
    title: '仓库管理', key: '8',
  }],
}, {
  title: '全渠道',
  key: '4',
  children: [{
    title: '门卫大叔', key: '9',
  }],
}];

const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    const title = node.title;
    dataList.push({ key, title });
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};
generateList(gData);

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

export default class Company extends Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    show: false//展示Modal
  }
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onChange = (e) => {
    const value = e.target.value;
    const expandedKeys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, gData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }

  handleChange = (value) => {
    console.log(`selected ${value}`);
  }


//添加角色
  addRole = () => {
    this.setState({
      show: true
    })
  }

  //隐藏
  hideShow = () => {
    this.setState({
      show: false
    })
  }

  hData = () =>{
    gData
  }


  //确定
  Sure = () => {
    this.setState({
      show: false

    })
  }
  
  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const loop = data => data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;
      if (item.children) {
        return (
          <TreeNode key={item.key} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title} />;
    });
    return (
      <div>
        <Button type="primary" onClick={this.addRole}>+添加角色</Button>

        <Add onShow={this.state.show}  hideShow={this.hideShow} Sure={this.Sure} gData={gData}/>

        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
        >
          {loop(gData)}
        </Tree>
      </div>
    );
  }
}
