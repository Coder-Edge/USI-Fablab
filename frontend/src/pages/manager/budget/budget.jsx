import { useEffect, useState } from "react";
import { NavParams } from "../../../components/Navbar/navParams";
import { defaults } from "chart.js";
import DoughnutChart from "../../../components/charts/doughnut";
import Button from "../../../components/button/Button";
import "./budget.css";
import SimpleCard from "../../../components/cards/simplecard";
import Histogram from "../../../components/charts/hist";
import getRandomColors from "../../../components/charts/colors";
import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownRight } from "react-icons/go";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

// La page manager/budget
const BudgetMNG = ({ setNavActive }) => {
  // Filtre actif
  const [activeBtn, setActiveBtn] = useState("Mensuel");

  useEffect(() => {
    // Activer le bouton budget de la navbar
    setNavActive(NavParams.budget);
  }, []);

  // ls données de diagramme pie

  const histData = {
    labels: [
      "Janvier",
      "Fevrier",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Aout",
      "Septembre",
      "Octobre",
    ],
    datasets: [
      {
        label: "Source de revenue",
        data: [10, 20, 30, 80, 28, 15, 36, 63, 81, 30],
        backgroundColor: "#094896",
      },
      {
        label: "Cout",
        data: [32, 2, 31, 40, 38, 45, 16, 23, 71, 10],
        backgroundColor: "#457FEB",
      },
    ],
  };

  const data1 = {
    labels: ["Depense", "Benefice net"],
    datasets: [
      {
        label: "cost",
        data: [10, 20],
        backgroundColor: ["rgba(88, 152, 221, 0.4)", "#5899DD"],
      },
    ],
  };

  let colors = getRandomColors(3);
  const data2 = {
    labels: ["Boutique en ligne", "Location fablab", "Donation"],
    datasets: [{ label: "cost", data: [15, 50, 35], backgroundColor: colors }],
  };

  colors = getRandomColors(3);
  const data3 = {
    labels: ["Boutique en ligne", "Location fablab", "Donation"],
    datasets: [{ label: "cost", data: [15, 50, 35], backgroundColor: colors }],
  };

  return (
    <div className="manager-budget">
      <div className="content">
        <div className="header">
          <div>
            <Button
              child="Mensuel"
              value="Mensuel"
              className={activeBtn == "Mensuel" ? "active" : ""}
              onClick={(e) => setActiveBtn(e.target.value)}
            />
            <Button
              child="Trimestriel"
              value="Trimestriel"
              className={activeBtn == "Trimestriel" ? "active" : ""}
              onClick={(e) => setActiveBtn(e.target.value)}
            />
            <Button
              child="Annuel"
              value="Annuel"
              className={activeBtn == "Annuel" ? "active" : ""}
              onClick={(e) => setActiveBtn(e.target.value)}
            />
          </div>
          <input type="date" name="" id="" />
        </div>
        <div className="dashboard">
          <DoughnutChart title={"Revenue brute de décembre"} data={data1} />
          <SimpleCard
            title={"Bénéfice net"}
            cost={"6000 $"}
            rate={"30%"}
            icon={<GoArrowUpRight />}
          />
          <SimpleCard
            title={"Dépenses"}
            cost={"6000 $"}
            rate={"30%"}
            icon={<GoArrowDownRight />}
          />
        </div>
        <div className="bilan">
          <Histogram title={"Bilan des revenus et des couts"} data={histData} />
        </div>
        <div className="bottom">
          <DoughnutChart title={"Source de revenue de décembre"} data={data2} />
          <DoughnutChart title={"Cout de décembre"} data={data3} />
        </div>
      </div>
    </div>
  );
};

export default BudgetMNG;
