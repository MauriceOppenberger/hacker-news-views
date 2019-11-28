import React from "react";
import queryString from "query-string";
import { fetchUser, fetchPosts } from "../utils/api";
import Loading from "./Loading";
import { formatTime } from "../utils/helpers";
import parse from "html-react-parser";
import PostList from "./PostList";

function fetchReducer(state, action) {
  if (action.type === "fetching") {
    return {
      ...state,
      loadingPosts: true,
      loadingUser: true
    };
  } else if (action.type === "userLoaded") {
    return {
      ...state,
      user: action.user,
      loadingUser: false
    };
  } else if (action.type === "postLoaded") {
    return {
      ...state,
      posts: action.posts,
      loadingPosts: false
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.messge,
      loadingUser: false,
      loadingPosts: false
    };
  } else {
    throw new Error("not action type initialized");
  }
}
const initialState = {
  user: null,
  error: null,
  posts: null,
  loadingUser: true,
  loadingPosts: true
};

export default function User({ location }) {
  const [state, dispatch] = React.useReducer(fetchReducer, initialState);

  const { id } = queryString.parse(location.search);

  React.useEffect(() => {
    dispatch({ type: "fetching" });
    fetchUser(id)
      .then(user => {
        dispatch({ type: "userLoaded", user });
        return fetchPosts(user.submitted.slice(0, 100) || []);
      })
      .then(posts => dispatch({ type: "postLoaded", posts }))
      .catch(({ message }) => dispatch({ type: "error", message }));
  }, []);

  const { user, posts, loadingPosts, loadingUser, error } = state;
  if (error) <h2>{error}</h2>;
  return (
    <>
      {loadingUser === true ? (
        <Loading text="Fetching User" />
      ) : (
        <>
          <h1 className="header">{user.id}</h1>
          <div className="meta-info-light">
            <span>
              created <b>{formatTime(user.created)}</b>
            </span>
            {typeof user.karma === "number" && (
              <span>
                , has <b>{user.karma}</b> karma
              </span>
            )}
          </div>
          {user.about && (
            <div className="about-user">{parse(`${user.about}`)}</div>
          )}
        </>
      )}
      {loadingPosts === true ? (
        loadingUser === false && <Loading text="Fetching Posts" />
      ) : (
        <>
          {posts.length > 0 ? (
            <>
              <h2>Posts</h2>
              <PostList posts={posts} />
            </>
          ) : (
            <h3>The user has no submitted posts yet</h3>
          )}
        </>
      )}
    </>
  );
}
