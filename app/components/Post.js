import React, { Component } from "react";
import Title from "./Title";
import queryString from "query-string";
import { fetchItem, fetchComments } from "../utils/api";
import Loading from "./Loading";
import MetaInfo from "./MetaInfo";
import Comment from "./Comment";

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null,
      comments: null,
      error: null,
      loadingPost: true,
      loadingComments: true
    };
  }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);

    fetchItem(id)
      .then(post => {
        this.setState({
          post,
          loadingPost: false
        });
        return fetchComments(post.kids || []);
      })
      .then(comments => {
        this.setState({
          comments,
          loadingComments: false
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loadingComments: true,
          loadingPost: true
        });
      });
  }

  render() {
    const { post, error, loadingPost, loadingComments, comments } = this.state;
    console.log(this.state);

    return (
      <>
        {loadingPost === true ? (
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
}
