import { gql, ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import clientPromise from "../../lib/mongodb";

const typeDefs = gql`
  type Product {
    _id: ID
    id: Int
    title: String
    price: Int
    description: String
    category: String
    image: String
    rating: Rating
  }

  type Rating {
    rate: Int
    count: Int
  }

  type Query {
    getProducts: [Product]
  }
`;

const resolvers = {
  Query: {
    getProducts: async () => {
      try {
        const client = await clientPromise;
        const db = client.db("NEXTjsStore");

        const products = await db
          .collection("Products")
          .find({})
          .limit(20)
          .toArray();
        return products;
      } catch (e) {
        console.error(e);
      }
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
