import { gql, ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import clientPromise from "../../lib/mongodb";
import { Product, Products } from "../../@types";
import { ObjectId } from "mongodb";

type AddToShoppingCart = {
  userId: string;
  productId: string;
  quantity: number;
};

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
    getProducts(id: Int): [Product]
    getProduct(id: Int): Product
    getAllShoppingCartItems: [ShoppingCart]
  }

  type Mutation {
    addToShoppingCart(
      userId: String
      productId: Int
      quantity: Int
    ): ShoppingCart!
  }

  type ShoppingCart {
    _id: ID
    userID: String
    items: Item
  }

  type Item {
    productId: Int
    quantity: Float
  }
`;

const resolvers = {
  Query: {
    getProducts: async <P, A extends Product>(parent: P, args: A) => {
      console.log("parent :>> ", parent);
      console.log("args :>> ", args);

      try {
        const client = await clientPromise;
        const db = client.db("NEXTjsStore");

        const products = await db.collection("Products").find({}).toArray();
        return products;
      } catch (e) {
        console.error(e);
      }
    },
    getProduct: async <P, A extends Product>(parent: P, args: A) => {
      console.log("args", args);
      if (args.id) {
        try {
          const client = await clientPromise;
          const db = client.db("NEXTjsStore");

          const products = await db
            .collection("Products")
            .findOne({ id: args.id });

          return products;
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          const client = await clientPromise;
          const db = client.db("NEXTjsStore");

          const products = await db.collection("Products").find({}).toArray();
          return products;
        } catch (e) {
          console.error(e);
        }
      }
    },
    getAllShoppingCartItems: async () => {
      try {
        const client = await clientPromise;
        const db = client.db("NEXTjsStore");

        const shoppingCartItems = await db
          .collection("ShoppingCart")
          .find({})
          .toArray();
        return shoppingCartItems;
      } catch (error) {
        console.warn(error);
      }
    },
  },

  Mutation: {
    addToShoppingCart: async <P, A extends AddToShoppingCart>(
      parent: P,
      args: A
    ) => {
      console.log("parent :>> ", parent);
      console.log("args :>> ", args);

      try {
        const client = await clientPromise; // load client
        const db = client.db("NEXTjsStore"); // connect to db

        const addToDB = await db.collection("ShoppingCart").insertOne({
          userID: args.userId,
          items: {
            productId: args.productId,
            quantity: args.quantity,
          },
        });
        const objID = addToDB.insertedId.toString();

        const getShoppingCart = await db
          .collection("ShoppingCart")
          .findOne({ _id: new ObjectId(objID) });

        return getShoppingCart;
      } catch (error) {
        console.error(error);
      }
    },
  },
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
