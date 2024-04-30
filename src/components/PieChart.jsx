import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ percentage, title }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    const ctx = chartContainer.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Completed", "Remaining"],
        datasets: [
          {
            label: title,
            data: [percentage, 100 - percentage],
            backgroundColor: ["#8bbb97", "#fafafa"],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [percentage, title]);

  return (
    <div style={{ position: "relative", width: "150px", height: "150px" }}>
      <canvas ref={chartContainer} />
      <p
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#555",
          zIndex: "-1",
        }}
      >
        {percentage.toFixed(1)}%
      </p>
    </div>
  );
};

export default PieChart;
