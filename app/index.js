import React from "react";
import ReactDom from "react-dom";
import Nav from "./components/Nav";
import { ThemeProvider } from "./context/theme";
import Loading from "./components/Loading";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./index.css";

const Posts = React.lazy(() => import("./components/Posts"));
const Post = React.lazy(() => import("./components/Post"));
const User = React.lazy(() => import("./components/User"));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "light",
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === "light" ? "dark" : "light"
        }));
      }
    };
  }
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <Nav />
            <main className="container">
              <React.Suspense
                fallback={<Loading text="Fetching Data" speed={500} />}
              >
                <Switch>
                  <Route exact path="/" render={() => <Posts type="top" />} />
                  <Route path="/new" render={() => <Posts type="new" />} />
                  <Route path="/post" component={Post} />
                  <Route path="/user" component={User} />
                  <Route render={() => <h1>404</h1>} />
                </Switch>
              </React.Suspense>
            </main>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
