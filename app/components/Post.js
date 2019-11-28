import React, { Component } from "react";
import Title from "./Title";
import queryString from "query-string";
import { fetchItem, fetchComments } from "../utils/api";
import Loading from "./Loading";
import MetaInfo from "./MetaInfo";
import Comment from "./Comment";

function fetchReducer(state, action) {
  if (action.type === "fetching") {
    return {
      ...state,
      loadingPost: true,
      loadingComments: true
    };
  } else if (action.type === "postLoaded") {
    return {
      ...state,
      post: action.post,
      loadingPost: false
    };
  } else if (action.type === "commentLoaded") {
    return {
      ...state,
      comments: action.comments,
      loadingComments: false
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.message,
      loadingPost: false,
      loadingComments: false
    };
  } else {
    throw new Error("no action type initialized");
  }
}
const initialState = {
  post: null,
  comments: null,
  error: null,
  loadingPost: true,
  loadingComments: true
};
export default function Post({ location }) {
  const [state, dispatch] = React.useReducer(fetchReducer, initialState);
  const { id } = queryString.parse(location.search);

  React.useEffect(() => {
    dispatch({ type: "fetching" });
    fetchItem(id)
      .then(post => {
        dispatch({ type: "postLoaded", post });
        return fetchComments(post.kids || []);
      })
      .then(comments => dispatch({ type: "commentLoaded", comments }))
      .catch(({ message }) => dispatch({ type: "error", message }));
  }, [id]);

  const { post, error, loadingPost, loadingComments, comments } = state;

  if (error) {
    return <h2>{error}}</h2>;
  }
  return (
    <>
      {loadingPost === true || !post ? (
        <Loading text="Fetching Post" />
      ) : (
        <>
          <h1 className="header">
            <Title url={post.url} title={post.title} id={post.id} />
          </h1>

          <MetaInfo by={post.by} id={post.id} time={post.time} />
          <p dangerouslySetInnerHTML={{ __html: post.text }} />
        </>
      )}
      {loadingComments === true ? (
        loadingPost === false && <Loading text="Fetching Comments" />
      ) : (
        <>
          <ul className="comment-list">
            {comments.length > 0 ? (
              comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
              ))
            ) : (
              <h3>This post has no comments yet</h3>
            )}
          </ul>
        </>
      )}
    </>
  );
}
