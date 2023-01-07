const mongoose = require("mongoose");
const graphql = require("graphql");
const Abode = require("../models/Abode");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const AbodeType = new GraphQLObjectType({
    name: "AbodeType",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        gods: {
            type: new GraphQLList(require("./god_type")),
            resolve(parentValue) {
                return Abode.findById(parentValue.id)
                    .populate("gods")
                    .then(abode => abode.gods)
            }
        }
    })
});

module.exports = AbodeType;