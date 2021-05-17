import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "isomorphic-fetch";
import { url } from "../lib/config";

export default function Home() {
  return <div className={styles.container}></div>;
}

export async function getServerSideProps(context) {
  const res = await fetch(`${url}/api/login`, {
    method: "POST",
    body: JSON.stringify({ username: "mimi", password: "xyz" }),
  }).then((res) => res.json());

  console.log(res);

  return {
    props: {},
  };
}
