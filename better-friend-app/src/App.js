import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./components/Header";
import Container from "./components/Container";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import NoMatch from "./pages/NoMatch";


function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Container>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </Container>
      </div>
    </Router>
  );
}
export default App;
