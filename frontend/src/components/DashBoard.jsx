import React, { useEffect, useState } from "react";
import UploadCSV from "./UploadCSV";
// import SummaryCards from "./SummaryCards";
// import EquipmentChart from "./EquipmentChart";
import History from "./History";
import { getHistory } from "../services/api";
import { UserButton } from "@clerk/clerk-react";

function Dashboard() {
    const [summary, setSummary] = useState(null);
    const [history, setHistory] = useState([]);
    // const API_BASE = process.env.REACT_APP_WEB_URL ?? "http://localhost:8000";
    const [selectedDatasetId, setSelectedDatasetId] = useState(null);
    const [compareList, setCompareList] = useState([]);
    const [dark, setDark] = useState(() => {
        if (typeof window === "undefined") {
            return false;
        }
        return localStorage.getItem("theme") === "dark";
    });

    const handleViewDataset = (summary, id) => {
        setSummary(summary);
        setSelectedDatasetId(id);
        localStorage.setItem("selectedSummary", JSON.stringify(summary));
        localStorage.setItem("selectedDatasetId", id);
    };


    const refreshHistory = () => {
        getHistory()
            .then((res) => setHistory(res.data))
            .catch(console.error);
    };


    useEffect(() => {
        refreshHistory();
    }, []);

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);

    useEffect(() => {
        const storedSummary = localStorage.getItem("selectedSummary");
        const storedDatasetId = localStorage.getItem("selectedDatasetId");

        if (storedSummary) {
            setSummary(JSON.parse(storedSummary));
        }

        if (storedDatasetId) {
            setSelectedDatasetId(Number(storedDatasetId));
        }
    }, []);
    return (
        <div className={dark ? "dark" : ""}>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                        Dashboard
                    </h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setDark(!dark)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-xl"
                        >
                            {dark ? "Light Theme" : "Dark Theme"}
                        </button>
                        <UserButton />
                    </div>
                </div>

                {/* Upload */}
                <UploadCSV setSummary={setSummary} className={dark ? "dark" : ""}
                    onUploadSuccess={refreshHistory} />


                <div className="mt-12">
                    <History
                        className={dark ? "dark" : ""}
                        history={history}
                        onView={handleViewDataset}
                        refreshHistory={refreshHistory}
                        selectedDatasetId={selectedDatasetId}
                        compareList={compareList}
                        setCompareList={setCompareList}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
