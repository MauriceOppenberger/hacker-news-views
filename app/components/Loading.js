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

export default function Loading(props) {
  const [content, setContent] = React.useState(props.text);
  const { text, speed } = props;
  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setContent(content => {
        return content === `${text}...` ? text : `${content}.`;
      });
    }, speed);
    return () => window.clearInterval(interval);
  }, [text, speed]);
  return (
    <div style={styles.content}>
      <p>{content}</p>
    </div>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number
};
Loading.defaultProps = {
  text: "Loading",
  speed: 300
};
