import React, { Component } from "react";
import { fetchMainPosts } from "../utils/api";
import Loading from "./Loading";
import PostList from "./PostList";

export default class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null,
      error: null,
      loading: true
    };
    this.handleFetch = this.handleFetch.bind(this);
  }

  componentDidMount() {
    this.handleFetch();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.handleFetch();
    }
  }

  handleFetch() {
    this.setState({
      posts: null,
      error: null,
      loading: true
    });
    fetchMainPosts(this.props.type)
      .then(posts => {
        this.setState({
          posts,
          error: null,
          loading: false
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: true
        });
      });
  }
  render() {
    const { posts, error, loading } = this.state;

    console.log(this.state);
    if (loading === true) {
      return <Loading text="Fetching Data" speed={300} />;
    }
    return <PostList posts={posts} />;
  }
}
