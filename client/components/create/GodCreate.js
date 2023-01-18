import React, { useState } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
const { NEW_GOD } = Mutations;
const { FETCH_GODS } = Queries;

const GodCreate = () => {
    const [godData, setData] = useState({
        name: "",
        description: "",
        type: "god",
        message: ""
    })

    const handleInput = (e, field) => {
        setData({...godData, [field]: e.target.value});
    }

    const handleSubmit = (e, newGod) => {
        e.preventDefault();

        newGod({
            variables: {
                name: godData.name,
                type: godData.type,
                description: godData.description
            }
        }).then(data => {
            setData({
                message: `New god ${godData.name} created successfully`,
                name: "",
                type: "god",
                description: ""
            });
        })
    }

    const updateCache = (cache, data) => {
        let gods;
        debugger
        try {
          // we'll try to read from our cache but if the query isn't in there no sweat!
          // We only want to update the data if it's in the cache already - totally fine if the data will
          // be fetched fresh later
          gods = cache.readQuery({ query: FETCH_GODS });
        } catch (err) {
          return;
        }
    
        // then our writeQuery will only run IF the cache already has data in it
        if (gods) {
          let godArray = gods.gods;
    
          cache.writeQuery({
            query: FETCH_GODS,
            data: { gods: godArray.concat(newGod) }
          });
        }
    }

    return (
        <Mutation
            mutation={NEW_GOD}
            update={(cache, data) => updateCache(cache, data)}
        >
            {( newGod, { data }) => {
                return (
                    <div>
                        <form onSubmit={(e) => handleSubmit(e, newGod)}>
                                <input onChange={(e) => handleInput(e, "name")} type="text"></input>
                                <textarea onChange={(e) => handleInput(e, "description")}></textarea>
                                <select onChange={(e) => handleInput(e, "type")}>
                                    <option value="god">God</option>
                                    <option value="goddess">Goddess</option>
                                </select>
                                <input type="submit" value="Create God" />
                        </form> 
                        <p>{godData.message}</p>
                    </div>
                )
            }}
        </Mutation>
    );
}

export default GodCreate;