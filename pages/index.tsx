import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { shopIcon } from "../utils/bootstrapIcons";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fake Store</title>
        <meta
          name="description"
          content="Fake store with NEXTjs / Apollo / GraphQL"
        />
        <link rel="icon" href="/fakeshopicon.svg" />
      </Head>

      <div className="container">
        <h3>Please buy one of these wonderfull products!</h3>
        <p>
          This is my webpage, created a few weeks ago. This is the webpage I am
          using to send out press releases and book reviews as I am a review
          person. I don't really know what that means, but I do it. And I like
          it. When I was a child, this website was named "Inquisitive Family
          Magazine." It went through a few name changes, eventually moving onto
          a great domain name (great is relative, because mine is crap).
        </p>
      </div>
    </div>
  );
};

export default Home;
