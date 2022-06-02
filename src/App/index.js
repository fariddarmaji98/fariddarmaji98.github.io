import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Menu from "../Components/Menu";
import SortCharacter from "../Components/SortCharacter";
import PsbbComponent from "../Components/Psbb";
import Error from "../Components/Error";

import { LayoutRoot, HeaderTitle } from './elements';

function App() {
  return (
    <div className="App">
      <LayoutRoot>
        <HeaderTitle>
          Written by Code.V
        </HeaderTitle>
        <Router>
          <Switch>
            <Route path="/error">
              <Error />
            </Route>
            <Route path="/sort-character">
              <SortCharacter />
            </Route>
            <Route path="/psbb">
              <PsbbComponent />
            </Route>
          </Switch>
          <Menu />
        </Router>
      </LayoutRoot>
    </div>
  );
}

export default App;
