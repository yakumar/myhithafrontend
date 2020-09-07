import Head from "next/head";

import Layout from "../components/Layout";
import Login from "./login";

import SignUp from "./signup";
import Staff from "./staffDashboard";

export default function Home() {
  return (
    <Layout>
      <Staff />
    </Layout>
  );
}
