import React, { useState } from "react";
import { Query, Mutation } from "react-apollo";
import Queries from "../../../graphql/queries";
import Mutations from "../../../graphql/mutations";

const { FETCH_ABODES, FETCH_GOD } = Queries;
const { UPDATE_GOD_ABODE } = Mutations;

const AbodeDetail = props => {
  const [editing, setEditing] = useState(false);
  const [abodeId, setAbodeId] = useState(props.abode.id);

  const handleEditing = e => {
    e.preventDefault();
    setEditing(true);
  };

  const handleInput = e => {
    setAbodeId(e.target.value);
  }

  const handleSubmit = (e, updateGodAbode) => {
    e.preventDefault();
    updateGodAbode({
        variables: {
            godId: props.id,
            abodeId: abodeId
        }
    }).then(() => setEditing(false));
  }

  const updateCache = (cache, { data: { updateGodAbode }}) => {
    let god;
   
    try {
        god = cache.readQuery({ query: FETCH_GOD, variables: { id: props.id } });
    } catch (err) {
        return;
    }

    if (god) {
        cache.writeQuery({
            query: FETCH_GOD,
            data: { god: updateGodAbode }
        })
    }
  }

  if (editing) {
    return (
        <Mutation update={(cache, data) => updateCache(cache, data)} mutation={UPDATE_GOD_ABODE}>
           {(updateGodAbode, data) => (
            <Query query={FETCH_ABODES}>
                {({ loading, error, data }) => {
                  
                    if (loading) return <div>Loading...</div>
                    if (error) return <div>Error...</div>
                    return (
                        <form onSubmit={e => handleSubmit(e, updateGodAbode)}>
                            <select onChange={handleInput} name="abodes" value={abodeId}>
                                {data.abodes.map((abode, i) => (
                                    <option key={i} value={abode.id}>{abode.name}</option>
                                ))}
                            </select>
                            <input type="submit" value="Change Abode"></input>
                        </form>
                )}}
            </Query>
           )}
        </Mutation>
    )
  } else {
    return (
        <div className="detail-div">
            <h2>{props.abode.name}</h2>
            <button onClick={handleEditing} className="edit-button">Edit</button>
        </div>
    )
  }
};

export default AbodeDetail;