import React from "react";
import { MdLocalHospital } from "react-icons/md";
import { FiLock } from "react-icons/fi";

export default function ClientCard({ client }) {
  return (
    <div className="bg-white shadow rounded-2xl p-5">
      <h2 className="font-semibold text-lg flex items-center gap-2">
        <MdLocalHospital className="text-green-600" />
        {client.name}
      </h2>
    
      <p className="text-sm">    Accuracy: {client.accuracy ? (Number(client.accuracy) * 100).toFixed(2) + "%" : "-"}

</p>
      <p className="text-sm">  Loss: {client.loss ? Number(client.loss).toFixed(2) : "-"}
</p>
      <p className="text-sm">Status: {client.status ?? "Active"}</p>

      <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
        <FiLock /> Raw patient data never leaves this client
      </p>
    </div>
  );
}
