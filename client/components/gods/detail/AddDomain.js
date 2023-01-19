import React, { useState } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../../graphql/mutations";
const { ADD_GOD_DOMAIN } = Mutations;

const AddDomain = props => {
    const [editing, setEditing] = useState(false);
    const [domain, setDomain] = useState("");

    const handleEditing = e => {
        e.preventDefault();
        setEditing(true);
    }

    const handleInput = e => {
        setDomain(e.target.value);
    }

    const handleSubmit = (e, addGodDomain) => {
        e.preventDefault();
        addGodDomain({
            variables: {
                id: props.id,
                domain: domain
            }
        }).then(() => setEditing(false));
    }

    if (editing) {
        return (
            <Mutation mutation={ADD_GOD_DOMAIN}>
                {(addGodDomain, data) => (
                    <form onSubmit={e => handleSubmit(e, addGodDomain)}>
                        <input onChange={handleInput} type="text"></input>
                        <input type="submit" value="Add Domain" />
                    </form>
                )}
            </Mutation>
        )
    } else {
        return (
            <div>
                <button onClick={handleEditing} className="add-domain-button">Add Domain</button>
            </div>
        )
    }

}

export default AddDomain;