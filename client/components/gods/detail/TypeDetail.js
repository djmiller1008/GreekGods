import React, { useState } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../../graphql/mutations";
const { UPDATE_GOD_TYPE } = Mutations;

const TypeDetail = props => {
    const [editing, setEditing] = useState(false);
    const [type, setType] = useState(props.type || "");

    const handleEdit = e => {
        e.preventDefault();
        setEditing(true);
    };

    const handleInput = e => {
        setType(e.target.value);
    };

    const handleSubmit = (e, updateGod) => {
        e.preventDefault();
        updateGod({
            variables: {
                id: props.id,
                type: type
            }
        }).then(() => setEditing(false));
    }

    if (editing) {
        return (
            <Mutation mutation={UPDATE_GOD_TYPE}>
                {(updateGod, data) => (
                    <div>
                        <form onSubmit={e => handleSubmit(e, updateGod)}>
                            <label htmlFor="type">Type</label>
                            <select onChange={e => handleInput(e)} name="type" value={type}>
                                <option value="god">God</option>
                                <option value="goddess">Goddess</option>
                            </select>
                            <input type="submit" value="Update Type"/>
                        </form>
                    </div>
                )}
            </Mutation>
        );
    } else {
        return (
            <div className="detail-div"> 
                <h2>{type}</h2>
                <button className="edit-button" onClick={e => handleEdit(e)}>Edit</button>
            </div>
        );
    }
};

export default TypeDetail;