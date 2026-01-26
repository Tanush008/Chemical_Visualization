import { Bar } from "react-chartjs-2";

function Charts({ summary }) {
  return (
    <Bar
      data={{
        labels: Object.keys(summary.equipment_type_distribution),
        datasets: [{
          label: "Equipment Count",
          data: Object.values(summary.equipment_type_distribution),
        }]
      }}
    />
  );
}
export default Charts