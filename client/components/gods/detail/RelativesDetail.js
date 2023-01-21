import React, { useState } from "react";
import { Mutation, Query } from "react-apollo";
import Mutations from "../../../graphql/mutations";
import Queries from "../../../graphql/queries";
import RemoveRelative from "./DeleteRelative";
const { ADD_GOD_RELATIVE } = Mutations;
const { FETCH_GODS, FETCH_GOD } = Queries;

const RelativesDetail = ({ id, relationship, relatives }) => {
    const [editing, setEditing] = useState(false);
    const [relativeId, setRelativeId] = useState("");

    const handleEditing = e => {
        e.preventDefault();
        setEditing(true);
    }

    const handleInput = e => {
        setRelativeId(e.target.value);
    }

    const handleSubmit = (e, addGodRelative) => {
        e.preventDefault();
        addGodRelative({
            variables: {
                godId: id,
                relativeId: relativeId,
                relationship: relationship
            }
        }).then(() => setEditing(false));
    }

    const updateCache = (cache, { data: { addGodRelative }}) => {
        let god;
        try {
            god = cache.readQuery({ query: FETCH_GOD, variables: { id: id }});
        } catch (err) {
            return;
        }

        if (god) {
            cache.writeQuery({
                query: FETCH_GOD,
                data: { god: addGodRelative }
            })
        }
    }


    if (editing) {
        return (
            <div>
                <h2>{relationship}</h2>
                <ul>
                    {relatives.map((relative, i) => (
                        <li key={i}>{relative.name}</li>
                    ))}
                </ul>
                <button onClick={handleEditing}>Add {relationship}</button>
                <Mutation mutation={ADD_GOD_RELATIVE} update={(cache, data) => updateCache(cache, data)}>
                    {(addGodRelative, data) => (
                        <Query query={FETCH_GODS}>
                            {({ loading, error, data }) => {
                                if (loading) return <div>Loading...</div>;
                                if (error) return <div>Error</div>;
                                return ( 
                                    <form onSubmit={e => handleSubmit(e, addGodRelative)}>
                                        <select defaultValue="Select" onChange={handleInput}>
                                                <option value="Select" disabled>Select</option>
                                                {data.gods.map((god, i) => {
                                                    const idArray = relatives.map(rel => rel.id);
                                                    if (!idArray.includes(god.id) && id !== god.id) {
                                                        return <option key={i} value={god.id}>{god.name}</option>
                                                    }
                                                })}
                                        </select>
                                        <input type="submit" value="Add Relative"></input>
                                    </form>
                            )}}
                        </Query>
                    )}
                </Mutation>
            </div>

        )
    } else {
        return (
            <div>
                <h2>{relationship}</h2>
                <ul>
                    {relatives.map((relative, i) => (
                        <li key={i}>{relative.name}
                        <RemoveRelative id={id} relativeId={relative.id} relationship={relationship} />
                        </li>
                    ))}
                </ul>
                <button onClick={handleEditing}>Add {relationship}</button>
            </div>
        );

    }
};

export default RelativesDetail;