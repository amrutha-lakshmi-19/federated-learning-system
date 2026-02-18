import Layout from "../components/layout";
import { startTraining } from "../services/federatedApi";


export default function ServerDashboard() {
const handleStart = async () => {
await startTraining();
alert("Federated training signal sent to all clients");
};


return (
<Layout>
<section className="card">
<h2>Server Dashboard</h2>
<p>This panel controls the federated learning process.</p>
<button onClick={handleStart}>Start Federated Training</button>
</section>
</Layout>
);
}