import React, { useState } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
const { FETCH_EMBLEMS } = Queries;
const { NEW_EMBLEM } = Mutations;

const EmblemCreate = () => {
    const [emblemData, setData] = useState({
        name: "",
        message: ""
    });

    const handleInput = (e, field) => {
        setData({ ...emblemData, [field]: e.target.value });
    }

    const handleSubmit = (e, newEmblem) => {
        e.preventDefault();

        newEmblem({
            variables: {
                name: emblemData.name
            }
        }).then(data => {
            setData({
                name: "",
                message: `New emblem ${emblemData.name} created successfully`
            })
        })
    }

    const updateCache = (cache, { data: { newEmblem }}) => {
        let emblems;
        try {
            emblems = cache.readQuery({ query: FETCH_EMBLEMS });
        } catch (err) {
            return;
        }

        if (emblems) {
            let emblemArray = emblems.emblem;

            cache.writeQuery({
                query: FETCH_EMBLEMS,
                data: { emblems: emblemArray.concat(newEmblem) }
            });
        }
    }

    return (
        <Mutation 
            mutation={NEW_EMBLEM}
            update={(cache, data) => updateCache(cache, data)}
        >
            {( newGod, { data }) => {
                return (
                    <div>
                        <form onSubmit={e => handleSubmit(e, newGod)}>
                            <input onChange={e => handleInput(e, "name")} type="text" />
                            <input type="submit" value="Create Emblem" />
                        </form>
                        <p>{emblemData.message}</p>
                    </div>
                )
            }}
        </Mutation>
    )


}

export default EmblemCreate;