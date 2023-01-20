import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../../graphql/mutations";
const { REMOVE_GOD_EMBLEM } = Mutations;


const DeleteEmblem = props => {

    const handleRemove = (e, removeGodEmblem) => {
        e.preventDefault();
        removeGodEmblem({
            variables: {
                godId: props.id,
                emblemId: props.emblemId
            }
        })
    }

    return (
        <Mutation mutation={REMOVE_GOD_EMBLEM}>
            {(removeGodEmblem, data) => (
                <button onClick={e => handleRemove(e, removeGodEmblem)}>Remove</button>
            )}
        </Mutation>
    );
};

export default DeleteEmblem;