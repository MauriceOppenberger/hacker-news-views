import React from "react";
import PropTypes from "prop-types";
import MetaInfo from "./MetaInfo";
import parse from "html-react-parser";
import ThemeContext from "../context/theme";

export default function Comment({ comment }) {
  const { theme } = React.useContext(ThemeContext);
  return (
    <li className={`list-item list-item-${theme}`}>
      <MetaInfo
        comment={true}
        id={comment.id}
        by={comment.by}
        time={comment.time}
      />
      <div className="comment-text">{parse(`${comment.text}`)}</div>
    </li>
  );
}
Comment.propTypes = {
  comment: PropTypes.object.isRequired
};
