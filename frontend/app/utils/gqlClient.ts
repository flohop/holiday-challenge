import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";

let client: ApolloClient<any> | null = null;


//const URI = "http://localhost:4000/graphql"
const URI = "http://141.95.127.73:4000/graphql"
export const getClient = () => {
    // create a new client if there's no existing one
    // or if we are running on the server.
    if (!client || typeof window === "undefined") {
        client = new ApolloClient({
            link: new HttpLink({
                uri: URI,
            }),
            cache: new InMemoryCache(),

        });
    }

    return client;
};