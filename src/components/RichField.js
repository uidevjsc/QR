import React from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
class RichField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  render() {
    console.log(this.state.text);
    return (
      <ReactQuill
        theme="snow"
        style={{ height: "200px", marginBottom: 50 }}
        value={this.props.value}
        onChange={this.props.onChange}
      />
      //  <ReactQuill value={ this.state.text }
      //     onChange={ this.handleChange } />
    );
  }
}

export default RichField;
