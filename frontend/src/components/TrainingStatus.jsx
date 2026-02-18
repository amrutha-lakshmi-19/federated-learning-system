import React from "react";


export default function TrainingStatus({ status }) {
return (
<div className="bg-white shadow rounded-2xl p-4">
<h2 className="font-semibold">Training Status</h2>
<p>{status}</p>
</div>
);
}
