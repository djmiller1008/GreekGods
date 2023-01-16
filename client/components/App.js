import React from "react";
import { Route } from "react-router-dom";
import GodCreate from "./create/GodCreatev2";
import GodsList from "./gods/GodsList";

const App = () => {
    return (
        <div>
            <Route exact path="/create" component={GodCreate} />
            <Route exact path="/" component={GodsList} />
        </div>
    )

}

export default App;