import "./appWrapper.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "../home/Home";
import { Header } from "../header/Header";
import { Favorites } from "../favorites/Favorites";

export const AppWrapper = () => {
  return (
    <div className="app_wrapper">
      <Router basename="/abra_project">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/favorites" component={Favorites} />
        </Switch>
      </Router>
    </div>
  );
};
