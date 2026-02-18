import Layout from "../components/layout";
import { getGlobalModel } from "../services/federatedApi";
import { useEffect, useState } from "react";


export default function GlobalModel() {
const [model, setModel] = useState(null);


useEffect(() => {
fetchModel();
const interval = setInterval(fetchModel, 5000);
return () => clearInterval(interval);
}, []);


const fetchModel = async () => {
const res = await getGlobalModel();
setModel(res.data);
};


return (
<Layout>
<section className="card">
<h2>Global Model Status</h2>
{!model ? (
<p>Loading model details...</p>
) : (
<ul>
<li><b>Training Round:</b> {model.round}</li>
<li><b>Accuracy:</b> {model.accuracy ? (model.accuracy * 100).toFixed(2) + "%" : "N/A"}</li>
<li><b>Loss:</b> {model.loss ?? "N/A"}</li>
</ul>
)}
</section>
</Layout>
);
}