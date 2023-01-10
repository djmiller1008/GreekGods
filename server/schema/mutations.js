const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");
const AbodeType = require("./abode_type");
const EmblemType = require("./emblem_type");
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
        resolve (parentValue, { id, name, type, description }) {
            const updateObj = {};
            
            updateObj.id = id;
            if (name) updateObj.name = name;
            if (type) updateObj.type = type;
            if (description) updateObj.description = description;
    
            return God.findOneAndUpdate({ _id: id }, { $set: updateObj }, { new: true }, (err, god) => {
                return god;
            });
        }
    },

    addGodRelative: {
        type: GodType,
        args: {
            godId: { type: GraphQLID },
            relativeId: { type: GraphQLID },
            relationship: { type: GraphQLString }
        },
        resolve(parentValue, { godId, relativeId, relationship }) {
            return God.addRelative(godId, relativeId, relationship);
        }
    },

    removeGodRelative: {
        type: GodType,
        args: {
            godId: { type: GraphQLID },
            relativeId: { type: GraphQLID },
            relationship: { type: GraphQLString }
        },
        resolve(parentValue, { godId, relativeId, relationship }) {
            return God.removeRelative(godId, relativeId, relationship)
        }
    },

    addGodEmblem: {
        type: EmblemType,
        args: {
            godId: { type: GraphQLID },
            emblemId: { type: GraphQLID }
        },
        resolve(parentValue, { godId, emblemId }) {
            return God.addEmblem(godId, emblemId);
        }
    },

    removeGodEmblem: {
        type: EmblemType,
        args: {
            godId: { type: GraphQLID },
            emblemId: { type: GraphQLID }
        },
        resolve(parentValue, { godId, emblemId }) {
            return God.removeEmblem(godId, emblemId);
        }
    },

    updateGodAbode: {
        type: AbodeType,
        args: {
            godId: { type: GraphQLID },
            abodeId: { type: GraphQLID }
        },
        resolve(parentValue, { godId, abodeId }) {
            return God.updateAbode(godId, abodeId);
        } 
 
    },

    addGodDomain: {
        type: GodType,
        args: {
            godId: { type: GraphQLID },
            domain: { type: GraphQLString }
        },
        resolve(parentValue, { godId, domain }) {
            return God.findById(godId)
                .then(god => {
                    god.domains.push(domain);
                    return god.save().then(god => god);
                });
        }
    },

    removeGodDomain: {
        type: GodType,
        args: {
            godId: { type: GraphQLID },
            domain: { type: GraphQLString }
        },
        resolve(parentValue, { godId, domain }) {
            return God.findById(godId)
                .then(god => {
                    god.domains.pull(domain);
                    return god.save().then(god => god);
                })
        }
    }
  },


});

module.exports = mutation;