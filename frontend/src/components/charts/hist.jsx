import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Histogram = ({title, data}) => {
  return (
    <div className="" style={{ width: "100%", height: "100%" }}>
      <h4>{title}</h4>
      <Bar
        data={data} />
    </div>
  );
};

export default Histogram;