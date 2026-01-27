import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Compare() {
    const navigate = useNavigate();
    const [compareList, setCompareList] = useState([]);
    useEffect(() => {
        const stored = localStorage.getItem("compareList");
        if (stored) {
            setCompareList(JSON.parse(stored));
        }
    }, []);
    const [dark, setDark] = useState(() => {
        if (typeof window === "undefined") {
            return false;
        }
        return localStorage.getItem("theme") === "dark";
    });
    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);
    if (compareList.length !== 2) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p>Please select exactly 2 datasets to compare.</p>
                <button
                    onClick={() => {
                        localStorage.removeItem("compareList");
                        navigate("/dashboard");
                    }}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    const [a, b] = compareList;

    return (
        <div className="min-h-screen bg-gray-100 p-8 dark:bg-gray-900">
            <h1 className="text-3xl font-bold mb-8 text-indigo-600 dark:text-white">
                Dataset Comparison
            </h1>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[a, b].map((d, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow dark:bg-gray-800">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white">
                            {d.name}
                        </h2>

                        <ul className="space-y-2 dark:text-white">
                            <li>Total Equipment: {d.summary.total_equipment}</li>
                            <li>Avg Flowrate: {d.summary.avg_flowrate.toFixed(2)}</li>
                            <li>Avg Pressure: {d.summary.avg_pressure.toFixed(2)}</li>
                            <li>Avg Temperature: {d.summary.avg_temperature.toFixed(2)}</li>
                        </ul>
                    </div>
                ))}
            </div>


            <div className="mt-10 bg-white rounded-xl shadow p-6 dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">
                    Side-by-Side Comparison
                </h2>

                <table className="w-full border dark:text-white">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="p-2 border">Metric</th>
                            <th className="p-2 border">{a.name}</th>
                            <th className="p-2 border">{b.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            ["Total Equipment", "total_equipment"],
                            ["Avg Flowrate", "avg_flowrate"],
                            ["Avg Pressure", "avg_pressure"],
                            ["Avg Temperature", "avg_temperature"],
                        ].map(([label, key]) => (
                            <tr key={key}>
                                <td className="p-2 border">{label}</td>
                                <td className="p-2 border">
                                    {a.summary[key].toFixed?.(2) ?? a.summary[key]}
                                </td>
                                <td className="p-2 border">
                                    {b.summary[key].toFixed?.(2) ?? b.summary[key]}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Compare;
