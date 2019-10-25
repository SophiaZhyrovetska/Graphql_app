import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLList,
	GraphQLNonNull,
	GraphQLID,
	GraphQLString,
} from "graphql";

import UserModel from "../models/user";

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
				resolve(root, params, next) {
					return UserModel.findByIdAndUpdate(params.id,
						{ name: params.name, surname: params.surname }, function (err: any) {
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

export const UserSchema = new GraphQLSchema({ query: queryType, mutation: mutation });
export default UserSchema;
