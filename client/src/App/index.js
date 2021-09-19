import { createClient, Provider as UqrlProvider } from "urql";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Nuggets } from "../Nuggets/";
import { Nugget } from "../Nugget/";
import { Navigation } from "../Navigation/";

const client = createClient({
  url: "http://localhost:4000/",
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
          <Route path="/nugget/:id">
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
