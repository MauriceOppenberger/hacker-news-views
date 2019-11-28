import React from "react";
import ReactDom from "react-dom";
import Nav from "./components/Nav";
import ThemeContext from "./context/theme";
import Loading from "./components/Loading";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./index.css";

const Posts = React.lazy(() => import("./components/Posts"));
const Post = React.lazy(() => import("./components/Post"));
const User = React.lazy(() => import("./components/User"));

function App() {
  const [theme, setTheme] = React.useState("light");
  const toggleTheme = () => {
    setTheme(theme => {
      return theme === "light" ? "dark" : "light";
    });
  };

  return (
    <Router>
      <ThemeContext.Provider value={theme}>
        <div className={theme}>
          <Nav toggleTheme={toggleTheme} />
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
      </ThemeContext.Provider>
    </Router>
  );
}

ReactDom.render(<App />, document.getElementById("app"));
