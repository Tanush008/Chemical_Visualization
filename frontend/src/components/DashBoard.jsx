import React, { useEffect, useState } from "react";
import UploadCSV from "./UploadCSV";
import SummaryCards from "./SummaryCards";
import EquipmentChart from "./EquipmentChart";
import History from "./History";
import { getHistory } from "../services/api";
import { UserButton } from "@clerk/clerk-react";

function Dashboard() {
    const [summary, setSummary] = useState(null);
    const [dark, setDark] = useState(false);
    const [history, setHistory] = useState([]);
    const [selectedDatasetId, setSelectedDatasetId] = useState(null);

    const handleViewDataset = (summary, id) => {
        setSummary(summary);
        setSelectedDatasetId(id);
    };

    const refreshHistory = () => {
        getHistory()
            .then((res) => setHistory(res.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        refreshHistory();
    }, [summary]);

    return (
        <div className={dark ? "dark" : ""}>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                        Chemical Equipment Parameter Visualizer
                    </h1>

                    <div className="flex gap-4 items-center">
                        <button
                            onClick={() => setDark(!dark)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-xl"
                        >
                            Toggle Dark
                        </button>
                        <UserButton />
                    </div>
                </div>


                <UploadCSV setSummary={setSummary} />


                {summary?.alerts?.length > 0 && (
                    <div className="bg-red-100 text-red-800 p-4 rounded mt-4">
                        {summary.alerts.map((alert, i) => (
                            <p key={i}>⚠️ {alert}</p>
                        ))}
                    </div>
                )}

                {/* Dashboard Content */}
                {summary && (
                    <div className="mt-8 space-y-8">
                        <SummaryCards summary={summary} />

                        <div className="bg-white p-6 rounded-xl shadow">
                            <EquipmentChart
                                distribution={summary.equipment_type_distribution}
                            />
                        </div>

                        <History
                            history={history}
                            onView={handleViewDataset}
                            refreshHistory={refreshHistory}
                            selectedDatasetId={selectedDatasetId}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
