import Layout from "../components/layout";


export default function Privacy() {
return (
<Layout>
<section className="card">
<h2>Privacy & Security</h2>
<ul>
<li>No raw client data is transmitted</li>
<li>Only trained model weights are shared</li>
<li>Clients operate independently</li>
<li>Secure aggregation on the server</li>
</ul>
<img src="/images/privacy.png" alt="Privacy" />
</section>
</Layout>
);
}