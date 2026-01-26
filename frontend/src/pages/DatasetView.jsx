import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SummaryCards from "../components/SummaryCards";
import EquipmentChart from "../components/EquipmentChart";
import { getHistory } from "../services/api";

function DatasetView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const API_BASE = process.env.REACT_APP_WEB_URL ?? "http://localhost:8000";
    const [dataset, setDataset] = useState(null);

    useEffect(() => {
        getHistory().then((res) => {
            const found = res.data.find((d) => d.id === Number(id));
            if (found) {
                setDataset(found);
            }
        });
    }, [id]);

    if (!dataset) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading dataset...</p>
            </div>
        );
    }

    const { summary, name } = dataset;

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-indigo-600">
                    {name}
                </h1>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg"
                >
                    ← Back to Dashboard
                </button>
            </div>


            {summary.alerts?.length > 0 && (
                <div className="bg-red-100 text-red-800 p-4 rounded mb-6">
                    {summary.alerts.map((a, i) => (
                        <p key={i}>⚠️ {a}</p>
                    ))}
                </div>
            )}


            <SummaryCards summary={summary} />

            <div className="mt-10 bg-white p-6 rounded-xl shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        Equipment Distribution
                    </h2>

                    <a
                        href={`${API_BASE}/api/report/pdf/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                        Download PDF
                    </a>
                </div>

                <EquipmentChart
                    distribution={summary.equipment_type_distribution}
                />
            </div>
        </div>
    );
}

export default DatasetView;
