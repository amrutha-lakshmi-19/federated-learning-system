import Layout from "../components/layout";


export default function Home() {
return (
<Layout>
<section className="card">
<h1>Privacy-Preserving Federated Learning Platform</h1>
<p>
A secure system that enables multiple clients to collaboratively train
a machine learning model without sharing raw data.
</p>
<img src="/assests/fl.png" alt="Federated sdf" />
</section>
</Layout>
);
}