import React from "react";
import PropTypes from "prop-types";
import MetaInfo from "./MetaInfo";
import { Link } from "react-router-dom";
import Title from "./Title";

export default function PostList({ posts }) {
  if (posts.length === 0) {
    return <p>the user has no posts yet</p>;
  }
  return (
    <ul className="post-list">
      {posts.map(post => {
        return (
          <li key={post.id} className="list-item">
            <Title url={post.url} title={post.title} id={post.id} />
            <MetaInfo
              by={post.by}
              descendants={post.descendants}
              time={post.time}
              id={post.id}
            />
          </li>
        );
      })}
    </ul>
  );
}
PostList.propTypes = {
  posts: PropTypes.array.isRequired
};
