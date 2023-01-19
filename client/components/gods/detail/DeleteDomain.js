import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../../graphql/mutations";
const { DELETE_GOD_DOMAIN } = Mutations;

const DeleteDomain = props => {

    const handleRemove = (e, removeGodDomain) => {
        e.preventDefault();
        removeGodDomain({
            variables: {
                id: props.id,
                domain: props.domain
            }
        })
    }

    return (
        <Mutation mutation={DELETE_GOD_DOMAIN}>
            {(removeGodDomain, data) => (
                <button onClick={e => handleRemove(e, removeGodDomain)} className="remove-domain">Remove</button>
            )}
        </Mutation>
    )
};

export default DeleteDomain;