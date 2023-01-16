import React from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { NEW_GOD } = Mutations;

class GodCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            type: "god",
            message: ""
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateCache = this.updateCache.bind(this);
    }

    handleInput(e, field) {
        this.setState({ [field]: e.target.value })
    }

    handleSubmit(e, newGod) {
        e.preventDefault();
        
        newGod({
            variables: {
                name: this.state.name,
                type: this.state.type,
                description: this.state.description
            }
        }).then(data => {
            console.log(data);
            this.setState({
                message: `New god ${this.state.name} created successfully `,
                name: "",
                type: "god",
                description: ""
            });
        })
    }

    updateCache(cache, { data: { newGod } }) {
        let gods;
        try {
          // we'll try to read from our cache but if the query isn't in there no sweat!
          // We only want to update the data if it's in the cache already - totally fine if the data will
          // be fetched fresh later
          gods = cache.readQuery({ query: FETCH_GODS });
        } catch (err) {
          return;
     }
    
      // then our writeQuery will only run IF the cache already has data in it
        if (gods) {
          let godArray = gods.gods;
    
          cache.writeQuery({
            query: FETCH_GODS,
            data: { gods: godArray.concat(newGod) }
          });
        }
      }

    render() {
        return (
            <Mutation
                mutation={NEW_GOD}
                update={(cache, data) => this.updateCache(cache, data)}
            >
                {( newGod, { data }) => {
                    return (
                        <div>
                            <form onSubmit={(e) => this.handleSubmit(e, newGod)}>
                                    <input onChange={(e) => this.handleInput(e, "name")} type="text"></input>
                                    <textarea onChange={(e) => this.handleInput(e, "description")}></textarea>
                                    <select onChange={(e) => this.handleInput(e, "type")}>
                                        <option value="god">God</option>
                                        <option value="goddess">Goddess</option>
                                    </select>
                                    <input type="submit" value="Create God" />
                            </form> 
                            <p>{this.state.message}</p>
                        </div>
                    )
                }}
            </Mutation>
        );
    }
}

export default GodCreate;