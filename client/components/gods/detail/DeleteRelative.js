import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../../graphql/mutations";
const { REMOVE_GOD_RELATIVE } = Mutations;

const RemoveRelative = ({ id, relativeId, relationship }) => {

    const handleRemove = (e, removeGodRelative) => {
        e.preventDefault();
        removeGodRelative({
            variables: {
                godId: id,
                relativeId: relativeId,
                relationship: relationship
            }
        })
    }

    return (
        <Mutation mutation={REMOVE_GOD_RELATIVE}>
            {(removeGodRelative, data) => (
                <button onClick={e => handleRemove(e, removeGodRelative)}>Remove</button>
            )}
        </Mutation>
        
    )

};

export default RemoveRelative;