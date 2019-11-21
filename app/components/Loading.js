import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
  content: {
    textAlign: "center",
    fontSize: "2rem",
    position: "absolute",
    right: "0",
    left: "0",
    marginTop: "20px"
  }
};
export default class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.text
    };
  }
  componentDidMount() {
    const { text, speed } = this.props;

    this.interval = window.setInterval(() => {
      this.state.content === text + "..."
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({ content: content + "." }));
    }, speed);
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    return (
      <div style={styles.content}>
        <p>{this.state.content}</p>
      </div>
    );
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
};
Loading.defaultProps = {
  text: "Loading",
  speed: 300
};
