import React, { useState } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
const { NEW_ABODE } = Mutations;
const { FETCH_ABODES } = Queries;

const AbodeCreate = () => {
    const [abodeData, setData] = useState({
        name: "",
        coordinates: "",
        message: ""
    });

    const handleInput = (e, field) => {
        setData({ ...abodeData, [field]: e.target.value });
    }

    const handleSubmit = (e, newAbode) => {
        e.preventDefault();

        newAbode({
            variables: {
                name: abodeData.name,
                coordinates: abodeData.coordinates
            }
        }).then(data => {
            setData({
                name: "",
                coordinates: "",
                message: `New abode ${abodeData.name} created successfully`
            });
        })
    }

    const updateCache = (cache, { data: { newAbode }}) => {
        let abodes;
        try {
            abodes = cache.readQuery({
                query: FETCH_ABODES
            });

        } catch (err) {
            return;
        }

        if (abodes) {
            let abodesArray = abodes.abodes;

            cache.writeQuery({
                query: FETCH_ABODES,
                data: { abodes: abodesArray.concat(newAbode)}
            });
        }
    }

    return (
        <Mutation 
            mutation={NEW_ABODE}
            update={(cache, data) => updateCache(cache, data)}
        >
            {( newAbode, { data }) => {
                return (
                    <div>
                        <form onSubmit={e => handleSubmit(e, newAbode)}>
                            <label for="name">Name</label>
                            <input onChange={(e) => handleInput(e, "name")} name="name" type="text" />
                            <label for="coordinates">Coordinates</label>
                            <input onChange={(e) => handleInput(e, "coordinates")} name="coordinates" type="text" />
                            <input type="submit" value="Create Abode" />
                        </form>
                        <p>{abodeData.message}</p>
                    </div>
                )
            }}
        </Mutation>
    )
}

export default AbodeCreate;