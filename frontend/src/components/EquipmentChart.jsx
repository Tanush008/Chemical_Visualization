import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function EquipmentChart({ distribution }) {
  return (
    <Bar
      data={{
        labels: Object.keys(distribution),
        datasets: [
          {
            label: "Equipment Count",
            data: Object.values(distribution),
            backgroundColor: "#4F46E5"
          }
        ]
      }}
    />
  );
}

export default EquipmentChart;
