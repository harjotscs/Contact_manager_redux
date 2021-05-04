import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import About from "./components/contacts/About";
import AddContact from "./components/contacts/AddContact";
import Contacts from "./components/contacts/Contacts";
import EditContact from "./components/contacts/EditContact";
import Header from "./components/layout/Header";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Header />
          <Switch>
            <Route exact path="/" component={Contacts} />
            <Route exact path="/contact/add" component={AddContact} />
            <Route exact path="/contact/edit/:id" component={EditContact} />
            <Route exact path="/about" component={About} />
          </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
