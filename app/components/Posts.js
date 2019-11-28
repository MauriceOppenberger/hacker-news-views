import React from "react";
import { fetchMainPosts } from "../utils/api";
import Loading from "./Loading";
import PostList from "./PostList";
import PropTypes from "prop-types";

function fetchReducer(state, action) {
  if (action.type === "fetching") {
    return {
      posts: null,
      error: null,
      loading: true
    };
  } else if (action.type === "postsLoaded") {
    return {
      posts: action.posts,
      loading: false,
      error: null
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.message,
      loading: false
    };
  } else {
    throw new Error("no action type initialized");
  }
}
const initialState = {
  posts: null,
  error: null,
  loading: true
};

export default function Posts(props) {
  const [state, dispatch] = React.useReducer(fetchReducer, initialState);

  React.useEffect(() => {
    dispatch({ type: "fetching" });

    fetchMainPosts(props.type)
      .then(posts => dispatch({ type: "postsLoaded", posts }))
      .catch(({ message }) => dispatch({ type: "error", message }));
  }, [props.type]);

  const { posts, error, loading } = state;

  if (error) {
    <h2>{error}</h2>;
  }
  if (loading === true) {
    return <Loading text="Fetching Data" speed={300} />;
  }
  return <PostList posts={posts} />;
}

Posts.propTypes = {
  type: PropTypes.oneOf(["top", "new"])
};
