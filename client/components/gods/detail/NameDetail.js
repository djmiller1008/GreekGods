import React, { useState } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../../graphql/mutations";
const { UPDATE_GOD_NAME } = Mutations;

const NameDetail = props => {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(props.name || "");
       
    const handleEdit = e => {
        e.preventDefault();
        setEditing(true);
    };

    const handleInput = e => {
        setName(e.target.value);
    };

    const handleSubmit = (e, updateGod) => {
        e.preventDefault();
        updateGod({
            variables: {
                id: props.id,
                name: name
            }
        }).then(() => setEditing(false));
    }

    if (editing) {
        return (
            <Mutation
                mutation={UPDATE_GOD_NAME}>
                    {(updateGod, data) => (
                        <div>
                            <form onSubmit={e => handleSubmit(e, updateGod)}>
                                <label htmlFor="name">Name</label>
                                <input name="name" type="text" value={name} onChange={e => handleInput(e)} />
                                <input type="submit" value="Update Name" />
                            </form>
                        </div>
                    )}
            </Mutation>
        );
    } else {
        return (
            <div className="detail-div">
                <h2>{name}</h2>
                <button className="edit-button" onClick={e => handleEdit(e)}>Edit</button>
            </div>
        );
    }
};

export default NameDetail;