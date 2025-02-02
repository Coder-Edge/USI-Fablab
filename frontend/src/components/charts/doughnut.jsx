import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DoughnutChart = ({title, data}) => {

  return (
    <div className="card">
      <h4>{title}</h4>
      <Doughnut
        data={data} />
    </div>
  );
};

export default DoughnutChart;