import Head from "next/head";

import Layout from "../components/Layout";
import Login from "./login";

import SignUp from "./signup";
import Staff from "./staffDashboard";
import TestDash from "./testDash";

export default function Home() {
  return (
    <Layout>
      <Login />
    </Layout>
  );
}
