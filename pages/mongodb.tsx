import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import { Props, Data } from "../@types";
import React from "react";
import MongoCard from "../components/MongoCard";

// export async function getServerSideProps(context: any) {
//   try {
//     await clientPromise;
//     // `await clientPromise` will use the default database passed in the MONGODB_URI
//     // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
//     //
//     // `const client = await clientPromise`
//     // `const db = client.db("myDatabase")`
//     //
//     // Then you can execute queries against your database like so:
//     // db.find({}) or any of the MongoDB Node Driver commands

//     return {
//       props: { isConnected: true },
//     };
//   } catch (e) {
//     console.error(e);
//     return {
//       props: { isConnected: false },
//     };
//   }
// }

// export default function Home({
//   isConnected,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return (
//     <div className="container">
//       <main>
//         <h1 className="title">
//           Welcome to <a href="https://nextjs.org">Next.js with MongoDB!</a>
//         </h1>

//         {isConnected ? (
//           <h2 className="subtitle" color="green">
//             You are connected to MongoDB
//           </h2>
//         ) : (
//           <h2 className="subtitle">
//             You are NOT connected to MongoDB. Check the <code>README.md</code>{" "}
//             for instructions.
//           </h2>
//         )}
//       </main>
//     </div>
//   );
// }

export const getServerSideProps = async (props: Props) => {
  const res = await fetch("http://localhost:3000/api/products");
  const data: Data = await res.json();
  return { props: { data } };
};

const mongodb = (props: Props) => {
  return (
    <div className="container">
      <h4>MongoDB data rendered below:</h4>

      {props.data &&
        props.data.map((product, index) => {
          return (
            <React.Fragment key={index}>
              <MongoCard
                id={product.id}
                title={product.title}
                price={product.price}
                description={product.description}
                category={product.category}
                image={product.image}
                rating={{
                  rate: product.rating.rate,
                  count: product.rating.count,
                }}
              />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default mongodb;
