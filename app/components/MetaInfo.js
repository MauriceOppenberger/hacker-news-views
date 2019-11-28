import React from "react";
import PropTypes from "prop-types";
import { formatTime } from "../utils/helpers";
import { Link } from "react-router-dom";
import ThemeContext from "../context/theme";

export default function MetaInfo({ id, by, time, descendants }) {
  const { theme } = React.useContext(ThemeContext);
  return (
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
  );
}

MetaInfo.propTypes = {
  id: PropTypes.number,
  by: PropTypes.string.isRequired,
  descendants: PropTypes.number,
  time: PropTypes.number.isRequired
};
