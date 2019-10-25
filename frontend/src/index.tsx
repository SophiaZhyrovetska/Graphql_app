import * as React from "react";

import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";

import apolloClient from "./boot/apollo";
import Test from "components/Test";
import GetUsersQuery from "./gql/queries/getUsers";

interface User {
	_id: string;
	name: string;
	surname: number;
}

interface UsersData {
	users: User[];
}


export function UsersList() {
	console.log(GetUsersQuery);
	const { loading, data } = useQuery<UsersData>(
		GetUsersQuery
	);
	return (
		<div>
			<h3>UsersList</h3>
			{
				data && data.users.map(user => (
					<div>
						<p>{user.name}</p>
						<p>{user.surname}</p>
					</div>
				))
			}
			<Test />
		</div>
	);
}

render(
	<ApolloProvider client={apolloClient}>
		<UsersList />
	</ApolloProvider>,
	document.getElementById("app")
);
