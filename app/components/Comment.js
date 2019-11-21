import React from "react";
import PropTypes from "prop-types";
import MetaInfo from "./MetaInfo";
import parse from "html-react-parser";
import { ThemeConsumer } from "../context/theme";
export default function Comment({ comment }) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <li className={`list-item list-item-${theme}`}>
          <MetaInfo
            comment={true}
            id={comment.id}
            by={comment.by}
            time={comment.time}
          />
          {/* <p dangerouslySetInnerHTML={{ __html: comment.text }} /> */}
          <div className="comment-text">{parse(`${comment.text}`)}</div>
        </li>
      )}
    </ThemeConsumer>
  );
}
Comment.propTypes = {
  comment: PropTypes.object.isRequired
};
