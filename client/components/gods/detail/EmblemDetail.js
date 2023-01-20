import React, { useState } from "react";
import { Mutation, Query } from "react-apollo";
import Mutations from "../../../graphql/mutations";
import Queries from "../../../graphql/queries";
import DeleteEmblem from "./DeleteEmblem";

const { FETCH_EMBLEMS } = Queries;
const { ADD_GOD_EMBLEM } = Mutations;

const EmblemDetail = props => {
    const [editing, setEditing] = useState(false);
    const [emblemId, setEmblemId] = useState("")

    const handleEditing = e => {
        e.preventDefault();
        setEditing(true);
    }

    const handleInput = e => {
        setEmblemId(e.target.value);
    }

    const handleSubmit = (e, addGodEmblem) => {
        e.preventDefault();
        addGodEmblem({
            variables: {
                godId: props.id,
                emblemId: emblemId
            }
        }).then(() => setEditing(false));
    }

    if (editing) {
        return (
            <div>
                <div className="emblems-div">
                    <h2>Emblems</h2>
                    <ul>
                        {props.emblems.map((emblem, i) => (
                            <li key={i}>{emblem.name}</li>
                        ))}
                    </ul>
                </div>
                <Mutation mutation={ADD_GOD_EMBLEM}>
                    {(addGodEmblem, data) => (
                        <Query query={FETCH_EMBLEMS}>
                            {({ loading, error, data }) => {
                                if (loading) return <div>Loading...</div>;
                                if (error) return <div>Error...</div>;
                                return (
                                    <form onSubmit={e => handleSubmit(e, addGodEmblem)}>
                                        <select onChange={handleInput} name="emblems" value={emblemId}>
                                            {data.emblems.map((emblem, i) => {
                                                if (!JSON.stringify(props.emblems).includes(JSON.stringify(emblem))) {
                                                    return <option value={emblem.id} key={i}>{emblem.name}</option>
                                                }
                                            })}
                                        </select>
                                        <input type="submit" value="Add Emblem"/>
                                    </form>
                                )
                            }}
                        </Query>
                    )}
                </Mutation>
            </div>
        )

    } else {
        return (     
            <div className="emblems-div">
                <h2>Emblems</h2>
                <ul>
                    {props.emblems.map((emblem, i) => (
                        <li key={i}>{emblem.name}
                            <DeleteEmblem id={props.id} emblemId={emblem.id} />
                        </li>
                    ))}
                </ul>
                <button onClick={handleEditing}>Add Emblem</button>
            </div>
        )
    };
};

export default EmblemDetail;