const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");
const God = mongoose.model("god");
const GodType = require("./god_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  
  fields: {
    newGod: {
        type: GodType,
        args: {
            name: { type: GraphQLString },
            type: { type: GraphQLString },
            description: { type: GraphQLString }
        },
        resolve(parentValue, { name, type, description }) {
            return new God({ name, type, description }).save();
        }
    },

    deleteGod: {
        type: GodType,
        args: {
            id: { type: GraphQLID }
        },
        resolve(parentValue, { id }) {
            return God.findOneAndDelete({ _id: id })
        }
    },

    updateGod: {
        type: GodType,
        args: {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            type: { type: GraphQLString },
            description: { type: GraphQLString }
        },
        resolve(parentValue, { id, name, type, description }) {
            const updateObj = {};
            // we can create our own object here and pass in the variables is they exist
            updateObj.id = id;
            if (name) updateObj.name = name;
            if (type) updateObj.type = type;
            if (description) updateObj.description = description;
    
            return God.findOneAndUpdate({ _id: id }, { $set: updateObj }, { new: true }, (err, god) => {
                return god;
            });
        }
    },
  },


});

module.exports = mutation;