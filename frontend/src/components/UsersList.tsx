import { ApolloProvider } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import {render} from "react-dom";
import gql from "graphql-tag";



interface User {
    _id: string;
    name: string;
    surname: number;
}

interface UsersData {
    users: User[];
}


const GET_USERS = gql`
  {
    users {
      _id
      name
      surname
    }
  }
`;


export function UsersList() {
    const { loading, data } = useQuery<UsersData>(
        GET_USERS
    );
    return (
        <div>
            <h3>UsersList</h3>
                    {data && data.users.map(user => (
                        <div>
                            <p>{user.name}</p>
                            <p>{user.surname}</p>
                        </div>
                    ))}
            )}
        </div>
    );
}

render(
    <ApolloProvider client={client}>
        <UsersList />
    </ApolloProvider>,
    document.getElementById('root')
);
