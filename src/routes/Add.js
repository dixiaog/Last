import { Modal, Button, Form,Input,Icon ,Select,Menu} from 'antd';
const Option = Select.Option;

// const menu = (
//     <Menu onClick={handleMenuClick}>
//       {gData.map((ele, index) => pp(ele, index))}
//     </Menu>
//   );
  
  function pp(ele, index) {
    return <Option key={index}>{ele.title}</Option>
  }

  function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e.key);
  }

class Add extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
//   hideShow = (e) => {
//     // console.log(11111);
//     // this.setState({
//     //   visible: false,
//     // });
//   }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  

  render() {
    const { onShow, hideShow,Sure,gData } = this.props;
    return (
      <div>
        {/* <Button type="primary" onClick={this.showModal}>Open</Button> */}
        <Modal
          title="Basic Modal"
          visible={onShow}
          onOk={Sure}
          onCancel={hideShow}
        >
            <Select defaultValue="选择分组" style={{ width: 120 }} onChange={this.handleChange}>
            {gData.map((ele, index) => pp(ele, index))}
            </Select>
            
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Add);
