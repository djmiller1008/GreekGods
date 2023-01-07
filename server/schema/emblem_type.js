const mongoose = require("mongoose");
const graphql = require("graphql");
const Emblem = require("../models/Emblem");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;


const EmblemType = new GraphQLObjectType({
    name: "EmblemType",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        gods: { 
            type: new GraphQLList(require("./god_type")),
            resolve(parentValue) {
                return Emblem.findById(parentValue.id)
                    .populate("gods")
                    .then(emblem => emblem.gods);
            }
                
        
        }
    })
});

module.exports = EmblemType;
