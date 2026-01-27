import React from "react";
import { deleteDataset } from "../services/api";
import { useNavigate } from "react-router-dom";

function History({ history, onView, refreshHistory, selectedDatasetId, compareList,
    setCompareList }) {
    const datasetCount = Array.isArray(history) ? history.length : 0;
    const navigate = useNavigate()
    if (datasetCount === 0) {
        return (
            <div className="bg-white p-6 rounded-xl shadow dark:bg-gray-800">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    Upload History (0 datasets)
                </h3>
                <p className="text-gray-500">No previous uploads</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Upload History ({datasetCount} dataset{datasetCount === 1 ? "" : "s"})
            </h3>
            <div className="space-y-4">
                {history.map((item) => (
                    <div key={item.id} className="flex w-full items-start gap-4">
                        <input
                            type="checkbox"
                            checked={compareList.some(d => d.id === item.id)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    if (compareList.length === 2) {
                                        alert("You can compare only 2 datasets");
                                        return;
                                    }
                                    setCompareList([...compareList, item]);
                                } else {
                                    setCompareList(
                                        compareList.filter(d => d.id !== item.id)
                                    );
                                }
                            }}
                            className="mt-2"
                        />
                        <div
                            className={`flex-1 rounded-2xl border bg-white/90 p-5 shadow-sm transition md:p-6 dark:bg-gray-900/70
                        ${selectedDatasetId === item.id
                                    ? "border-indigo-500 ring-2 ring-indigo-200/60"
                                    : "border-gray-200 dark:border-gray-700"
                                }`}
                        >
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {item.name}
                                    </p>
                                    <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                                        <span className="font-medium text-gray-500 dark:text-gray-400">Dataset ID:</span>
                                        <span>#{item.id}</span>
                                        <span className="font-medium text-gray-500 dark:text-gray-400">Total Equipment:</span>
                                        <span>{item.summary.total_equipment}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4">

                                    <button
                                        onClick={() => navigate(`/dataset/${item.id}`)}
                                        className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 bg-indigo-600"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={async () => {
                                            const confirmed = window.confirm(
                                                "Are you sure you want to delete this dataset? This action cannot be undone."
                                            );

                                            if (!confirmed) return;
                                            await deleteDataset(item.id);

                                            if (item.id === selectedDatasetId) {
                                                localStorage.removeItem("selectedSummary");
                                                localStorage.removeItem("selectedDatasetId");
                                            }

                                            refreshHistory();
                                        }}
                                        className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {compareList.length === 2 && (
                <button
                    onClick={() => {
                        localStorage.setItem(
                            "compareList",
                            JSON.stringify(compareList)
                        );
                        navigate("/compare");
                    }}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                    Compare Selected
                </button>
            )}

        </div >

    );
}

export default History;
