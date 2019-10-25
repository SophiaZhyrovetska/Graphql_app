const GraphQLSchema = require('graphql').GraphQLSchema;
const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLList = require('graphql').GraphQLList;
const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLID = require('graphql').GraphQLID;
const GraphQLString = require('graphql').GraphQLString;
const UserModel = require('../models/user.model');

const userType = new GraphQLObjectType({
    name: 'user',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            name: {
                type: GraphQLString
            },
            surname: {
                type: GraphQLString
            }
        }
    }
});


const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        users: {
            type: new GraphQLList(userType),
            resolve: function () {
                const users = UserModel.find().exec();
                if (!users) {
                    throw new Error('Error')
                }
                return users
            }
        },
        user: {
            type: userType,
            args: {
                id: {
                    name: '_id',
                    type: GraphQLString
                }
            },
            resolve: function (root, params) {
                const userInfo = UserModel.findById(params.id).exec();
                if (!userInfo) {
                    throw new Error('Error')
                }
                return userInfo
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addUser: {
                type: userType,
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    surname: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: function (root, params) {
                    const userModel = new UserModel(params);
                    const newUser = userModel.save();
                    if (!newUser) {
                        throw new Error('Error');
                    }
                    return newUser
                }
            },
            updateUser: {
                type: userType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    surname: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    return UserModel.findByIdAndUpdate(params.id,
                        { name: params.name, surname: params.surname}, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            removeUser: {
                type: userType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remBook = UserModel.findByIdAndRemove(params.id).exec();
                    if (!remBook) {
                        throw new Error('Error')
                    }
                    return remBook;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({query: queryType, mutation: mutation});