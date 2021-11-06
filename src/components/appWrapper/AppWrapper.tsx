import "./appWrapper.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "../home/Home";
import { Header } from "../header/Header";
import { Favorites } from "../favorites/Favorites";

export const AppWrapper = () => {
  return (
    <div className="app_wrapper">
      <Router>
        <Header />
        <Switch>
          <Route exact path="abra_project/" component={Home} />
          <Route exact path="abra_project/favorites" component={Favorites} />
        </Switch>
      </Router>
    </div>
  );
};
