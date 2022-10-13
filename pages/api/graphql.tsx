import { gql, ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import clientPromise from "../../lib/mongodb";
import { Data } from "../../@types";

const typeDefs = gql`
  type Product {
    _id: ID
    id: Int
    title: String
    price: Float
    description: String
    category: String
    image: String
    rating: Rating
  }

  type Rating {
    rate: Float
    count: Int
  }

  type Query {
    getProducts: [Product]
  }

  type Mutation {
    insertTest(testString: String, testNumber: Int): Test!
    addToShoppingCart(
      userId: String
      productId: String
      quantity: Int
    ): ShoppingCart!
  }

  type Test {
    _id: ID
    testString: String
    testNumber: Int
  }

  type ShoppingCart {
    _id: ID
    userID: String
    items: [Item]
  }

  type Item {
    productId: String
    quantity: Float
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

  Mutation: {
    insertTest: async <X, Y extends Test>(parent: X, args: Y) => {
      console.log("args :>> ", args);
      try {
        const client = await clientPromise;
        const db = client.db("NEXTjsStore");

        const insertSomething = await db.collection("Test").insertOne({
          testString: args.testString,
          testNumber: args.testNumber,
        });
        console.log("insertSomething :>> ", insertSomething.insertedId);
        return {
          _id: insertSomething.insertedId,
          testString: args.testString,
          testNumber: args.testNumber,
        };
      } catch (error) {
        console.error(error);
      }
    },
    addToShoppingCart: async <T,>(args: T) => {
      console.log("args :>> ", args);
      return "You have reached the end";
    },
  },
};

type Test = {
  testString: string;
  testNumber: number;
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
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
