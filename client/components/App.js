import React from "react";
import { Route } from "react-router-dom";
import GodCreate from "./create/GodCreate";
import GodsList from "./gods/GodsList";
import { CreateIndex } from "./create/CreateIndex";
import { Nav } from "./header/Nav";

const App = () => {
    return (
        <div>
            <Nav />
            <Route exact path="/new" component={CreateIndex} />
            <Route exact path="/" component={GodsList} />
        </div>
    )

}

export default App;