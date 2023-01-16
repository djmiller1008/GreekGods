import React from "react";
import { Route } from "react-router-dom";
import GodsList from "./gods/GodsList";

const App = () => {
    return (
        <div>
            <Route exact path="/" component={GodsList} />
        </div>
    )

}

export default App;