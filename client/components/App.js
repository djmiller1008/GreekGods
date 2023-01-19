import React from "react";
import { Route, Switch } from "react-router-dom";
import GodsList from "./gods/GodsList";
import GodDetail from "./gods/GodDetail";
import { CreateIndex } from "./create/CreateIndex";
import { Nav } from "./header/Nav";

const App = () => {
    return (
        <div>
            <Nav />
            <Switch>
                <Route exact path="/gods/:id" component={GodDetail} />
                <Route exact path="/new" component={CreateIndex} />
                <Route exact path="/" component={GodsList} />
            </Switch>
         
        </div>
    )

}

export default App;