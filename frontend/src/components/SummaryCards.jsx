function SummaryCards({ summary }) {
    const items = [
        ["Total Equipment", summary.total_equipment],
        ["Avg Flowrate", summary.avg_flowrate.toFixed(2)],
        ["Avg Pressure", summary.avg_pressure.toFixed(2)],
        ["Avg Temperature", summary.avg_temperature.toFixed(2)],
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {items.map(([title, value]) => (
                <div key={title} className="bg-white p-6 rounded-xl shadow dark:bg-gray-800">
                    <p className="text-gray-500 dark:text-white">{title}</p>
                    <h2 className="text-2xl font-bold text-indigo-600 dark:text-white">{value}</h2>
                </div>
            ))}
        </div>
    );
}
export default SummaryCards;