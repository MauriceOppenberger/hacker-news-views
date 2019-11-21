import React, { Component } from "react";
import queryString from "query-string";
import { fetchUser, fetchPosts } from "../utils/api";
import Loading from "./Loading";
import { formatTime } from "../utils/helpers";
import parse from "html-react-parser";
import PostList from "./PostList";
export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      error: null,
      posts: null,
      loadingUser: true,
      loadingPosts: true
    };
  }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);

    fetchUser(id)
      .then(user => {
        this.setState({
          user,
          loadingUser: false
        });
        return fetchPosts(user.submitted.slice(0, 100) || []);
      })
      .then(posts => {
        this.setState({
          posts,
          loadingPosts: false
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loadingPosts: true,
          loadingUser: true
        });
      });
  }
  render() {
    console.log(this.state.user);
    const { user, posts, loadingPosts, loadingUser, error } = this.state;
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
}
