import React from "react";
import PropTypes from "prop-types";
import { formatTime } from "../utils/helpers";
import { Link } from "react-router-dom";
import { ThemeConsumer } from "../context/theme";

export default function MetaInfo({ id, by, time, descendants }) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`meta-info-${theme}`}>
          <span>
            by{" "}
            <Link to={`/user?id=${by}`}>
              <b>{by}</b>
            </Link>
          </span>
          <span>, on {formatTime(time)}</span>
          {typeof descendants === "number" && (
            <Link to={`/post?id=${id}`}>
              <span>
                , with <b>{descendants}</b> comments
              </span>
            </Link>
          )}
        </div>
      )}
    </ThemeConsumer>
  );
}

MetaInfo.propTypes = {
  id: PropTypes.number,
  by: PropTypes.string.isRequired,
  descendants: PropTypes.number,
  time: PropTypes.number.isRequired
};
