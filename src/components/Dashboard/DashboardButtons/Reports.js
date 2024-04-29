import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Spinner, Alert } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./Button.scss";

import Sidebar from "../DashboardNav/Sidebar";
import TopNav from "../DashboardNav/TopNav";
import Footer from "../DashboardNav/Footer";

import { AuthContext } from "../../Content/LoginPage/AuthContext";

// Register the components used in the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const cities = [
  "all", // default value
  "Nicosia",
  "Limassol",
  "Larnaca",
  "Famagusta",
  "Paphos",
  "Kyrenia",
  "Protaras",
  "Polis",
  "Ayia Napa",
  "Troodos",
];

const Reports = () => {
  const userName = localStorage.getItem("userName");
  const userSurname = localStorage.getItem("userSurname");
  const userRole = localStorage.getItem("userRole");

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    if (!token && !userRole) {
      navigate("/login");
    } else if (userRole === "admin") {
      fetchUserReportData();
    } else if (userRole === "manager") {
      navigate("/managerdash");
    } else if (userRole === "volunteer") {
      navigate("/volunteerdash");
    } else if (userRole === "olduser") {
      navigate("/olduserdash");
    }
  }, [navigate, token, userRole]);

  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const transformData = (rawData) => {
    const initialCityData = cities.reduce((acc, city) => {
      // Initialize each city with counts of 0
      acc[city] = { male: 0, female: 0, other: 0, total: 0 };
      return acc;
    }, {});

    rawData.forEach(item => {
      const city = item._id;
      if (!initialCityData[city]) {
        initialCityData[city] = { male: 0, female: 0, other: 0, total: 0 };
      }

      item.genders.forEach(genderData => {
        const gender = genderData.gender.toLowerCase();
        initialCityData[city][gender] += genderData.count;
      });

      initialCityData[city].total += item.total;
    });

    return initialCityData;
  };

  const createChartData = (transformedData) => {
    // Assuming your transformed data is an object with city names as keys
  // and each city has an object containing male, female, other, and total
  const chartData = {
    labels: Object.keys(transformedData), // The city names
    datasets: [
      {
        label: 'Male',
        data: Object.values(transformedData).map(data => data.male),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
      {
        label: 'Female',
        data: Object.values(transformedData).map(data => data.female),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Other',
        data: Object.values(transformedData).map(data => data.other),
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
      },
      {
        label: 'Total',
        data: Object.values(transformedData).map(data => data.total),
        backgroundColor: '#20C988',
        borderColor: '#',
      },
    ],
  };

  return chartData;
};

  const fetchUserReportData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/volunteers/volunteer-stats"); // Ensure this API sends structured data
      const transformedData = transformData(data); // Transform the raw data
      const formatChartData = createChartData(transformedData); // Create the chart data from transformed data
      setChartData(formatChartData); // Update state with new chart data
    } catch (error) {
      console.error("Error fetching report data:", error);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const options = {
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Volunteer Distribution by City and Gender",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  console.log(chartData);

  return (
    <div className="sb-nav-fixed">
      <TopNav userRole={userRole} />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar
            userRole={userRole}
            userName={userName}
            userSurname={userSurname}
          />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Reports</h1>
              <div className="row">
                <div className="col-xs-12">
                  <div className="chart">
                    <Bar data={chartData} options={options} />
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Reports;

// setLoading(true);
//     try {
//       const { data } = await axios.get("http://localhost:5000/volunteers/volunteer-stats"); 
//       const labels = data.map((item) => item._id);
//       const dataset = data.map((city) => ({
//         label: city._id,
//         data: city.genders.map((g) => g.count),
//         backgroundColor: [
//           "rgba(54, 162, 235, 0.5)",
//           "rgba(255, 99, 132, 0.5)",
//           "rgba(153, 102, 255, 0.5)",
//           "rgba(201, 203, 207, 0.5)",
//         ],
//         borderColor: [
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 99, 132, 1)",
//           "rgba(153, 102, 255, 1)",
//           "rgba(201, 203, 207, 1)",
//         ],
//         borderWidth: 1,
//       }));
//       // Aggregate data by city and gender
//       const cityData = cities.reduce(
//         (acc, city) => {
//           const filteredData = data.filter((user) => user.city === city);
//           const males = filteredData.filter(
//             (user) => user.gender === "male"
//           ).length;
//           const females = filteredData.filter(
//             (user) => user.gender === "female"
//           ).length;
//           const others = filteredData.filter(
//             (user) => user.gender === "other"
//           ).length;
//           const total = filteredData.length;

//           acc.males.push(males);
//           acc.females.push(females);
//           acc.others.push(others);
//           acc.total.push(total);

//           return acc;
//         },
//         { males: [], females: [], others: [], total: [] }
//       );

//       const maleData = Object.values(cityData).map((data) => data.male);
//       const femaleData = Object.values(cityData).map((data) => data.female);
//       const otherData = Object.values(cityData).map((data) => data.other);
//       const totalData = Object.values(cityData).map((data) => data.total);

//       const formatChartData = {
//         labels: Object.keys(cityData),
//         datasets: [
//           {
//             label: "Male",
//             data: maleData,
//             backgroundColor: "rgba(54, 162, 235, 0.5)",
//           },
//           {
//             label: "Female",
//             data: femaleData,
//             backgroundColor: "rgba(255, 99, 132, 0.5)",
//           },
//           {
//             label: "Other",
//             data: otherData,
//             backgroundColor: "rgba(153, 102, 255, 0.5)",
//           },
//           {
//             label: "Total",
//             data: totalData,
//             backgroundColor: "#20C988",
//           },
//         ],
//       };
//       setChartData(formatChartData); //
//     } catch (error) {
//       console.error("Error fetching report data:", error);
//       setError("Failed to fetch data.");
//     } finally {
//       setLoading(false);
//     }