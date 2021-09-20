import { createClient, defaultExchanges, Provider as UqrlProvider } from "urql";
import { devtoolsExchange } from '@urql/devtools';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Nuggets } from "../Nuggets/";
import { Nugget } from "../Nugget/";
import { Navigation } from "../Navigation/";

const client = createClient({
  url: "http://localhost:4000/",
  exchanges: [devtoolsExchange, ...defaultExchanges],
});

export const App = () => {
  return (
    <UqrlProvider value={client}>
      <Router>
        <Navigation />
        <Switch>
          <Redirect exact from="/" to="/nuggets" />
          <Route exact path="/nuggets">
            <Nuggets />
          </Route>
          <Route exact path="/nugget/create">
            <Nugget />
          </Route>
          <Route path="*">
            <h1>Four oh four</h1>
          </Route>
        </Switch>
      </Router>
    </UqrlProvider>
  );
};
