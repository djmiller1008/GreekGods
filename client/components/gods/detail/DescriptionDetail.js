import React, { useState } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../../graphql/mutations";
const { UPDATE_GOD_DESCRIPTION } = Mutations;

const DescriptionDetail = props => {
    const [editing, setEditing] = useState(false);
    const [description, setDescription] = useState(props.description || "");
       
    const handleEdit = e => {
        e.preventDefault();
        setEditing(true);
    };

    const handleInput = e => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e, updateGod) => {
        e.preventDefault();
        updateGod({
            variables: {
                id: props.id,
                description: description
            }
        }).then(() => setEditing(false));
    }

    if (editing) {
        return (
            <Mutation
                mutation={UPDATE_GOD_DESCRIPTION}>
                    {(updateGod, data) => (
                        <div>
                            <form onSubmit={e => handleSubmit(e, updateGod)}>
                                <label htmlFor="description">Description</label>
                                <textarea name="description" type="text" value={description} onChange={handleInput} />
                                <input type="submit" value="Update Description" />
                            </form>
                        </div>
                    )}
            </Mutation>
        );
    } else {
        return (
            <div className="detail-div">
                <h3>{description}</h3>
                <button className="edit-button" onClick={handleEdit}>Edit</button>
            </div>
        );
    }
};

export default DescriptionDetail;