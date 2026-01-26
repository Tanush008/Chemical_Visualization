import React from "react";
import { deleteDataset } from "../services/api";

function History({ history, onView, refreshHistory, selectedDatasetId }) {
    const datasetCount = Array.isArray(history) ? history.length : 0;

    if (datasetCount === 0) {
        return (
            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-2">
                    Upload History (0 datasets)
                </h3>
                <p className="text-gray-500">No previous uploads</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">
                Upload History ({datasetCount} dataset{datasetCount === 1 ? "" : "s"})
            </h3>
            <div className="space-y-4">
                {history.map((item, index) => (
                    <div
                        className={`border p-4 rounded-lg flex justify-between items-center transition
                        ${selectedDatasetId === item.id
                                ? "bg-indigo-50 border-indigo-500"
                                : "bg-white"
                            }`}
                    >
                        <div>
                            <p className="font-medium">
                                {item.name}
                            </p>
                            <p className="text-sm text-gray-600">
                                Total Equipment: {item.summary.total_equipment}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            
                            <button
                                onClick={() => onView(item.summary, item.id)}
                                className="px-3 py-1 bg-indigo-600 text-white rounded">
                                View
                            </button>
                            
                            <button
                                onClick={async () => {
                                    await deleteDataset(item.id);
                                    refreshHistory();
                                }}
                                className="px-3 py-1 bg-red-600 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default History;
