import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const [oldUserChartData, setOldUserChartData] = useState({
    datasets: [],
  });

  const [AcceptedRequestChartData, setAcceptedRequestChartData] = useState({
    datasets: [],
  });

  const [PendingRequestChartData, setPendingRequestChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    if (!token && !userRole) {
      navigate("/login");
    } else if (userRole === "admin") {
      fetchUserReportData();
      fetchOldUserReportData();
      fetchAcceptedRequestReportData();
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

    rawData.forEach((item) => {
      const city = item._id;
      if (!initialCityData[city]) {
        initialCityData[city] = { male: 0, female: 0, other: 0, total: 0 };
      }

      item.genders.forEach((genderData) => {
        const gender = genderData.gender.toLowerCase();
        initialCityData[city][gender] += genderData.count;
      });

      initialCityData[city].total += item.total;
    });

    return initialCityData;
  };

  const transformOldUserData = (rawData) => {
    const initialCityData = cities.reduce((acc, city) => {
      acc[city] = { male: 0, female: 0, other: 0, total: 0 };
      return acc;
    }, {});

    rawData.forEach((item) => {
      const city = item._id.trim();

      if (!initialCityData[city]) {
        initialCityData[city] = { male: 0, female: 0, other: 0, total: 0 };
      }

      // Sum the counts for each gender within the city
      item.genders.forEach((genderData) => {
        const gender = genderData.gender.toLowerCase();
        initialCityData[city][gender] += genderData.count;
      });

      // Sum the total counts for the city
      initialCityData[city].total += item.total;
    });

    return initialCityData;
  };

  const transformAcceptedRequestData = (rawData) => {
    
  };

  const createChartData = (transformedData) => {
    const chartData = {
      labels: Object.keys(transformedData), // city names
      datasets: [
        {
          label: "Male",
          data: Object.values(transformedData).map((data) => data.male),
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
        },
        {
          label: "Female",
          data: Object.values(transformedData).map((data) => data.female),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
        },
        {
          label: "Other",
          data: Object.values(transformedData).map((data) => data.other),
          backgroundColor: "rgba(153, 102, 255, 0.5)",
          borderColor: "rgba(153, 102, 255, 1)",
        },
        {
          label: "Total",
          data: Object.values(transformedData).map((data) => data.total),
          backgroundColor: "#20C988",
          borderColor: "#",
        },
      ],
    };

    return chartData;
  };

  const createOldUserChartData = (transformedData) => {
    const labels = Object.keys(transformedData);
    const maleData = labels.map((city) => transformedData[city].male);
    const femaleData = labels.map((city) => transformedData[city].female);
    const otherData = labels.map((city) => transformedData[city].other);
    const totalData = labels.map((city) => transformedData[city].total);

    return {
      labels,
      datasets: [
        {
            label: "Male",
            data: Object.values(transformedData).map((data) => data.male),
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
          },
          {
            label: "Female",
            data: Object.values(transformedData).map((data) => data.female),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: "Other",
            data: Object.values(transformedData).map((data) => data.other),
            backgroundColor: "rgba(153, 102, 255, 0.5)",
            borderColor: "rgba(153, 102, 255, 1)",
          },
          {
            label: "Total",
            data: Object.values(transformedData).map((data) => data.total),
            backgroundColor: "#20C988",
            borderColor: "#",
          },
      ],
    };
  };

  const createAcceptedRequestChartData = (transformedData) => {//VALE KAI TA PREFFERED AGES ALLA KAI TO ALL(volunteers kai geroi)
    const labels = Object.keys(transformedData);
    const maleData = labels.map((city) => transformedData[city].male);
    const femaleData = labels.map((city) => transformedData[city].female);
    const otherData = labels.map((city) => transformedData[city].other);
    const totalData = labels.map((city) => transformedData[city].total);

    return {
      labels,
      datasets: [
        {
            label: "Male",
            data: Object.values(transformedData).map((data) => data.male),
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
          },
          {
            label: "Female",
            data: Object.values(transformedData).map((data) => data.female),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: "Other",
            data: Object.values(transformedData).map((data) => data.other),
            backgroundColor: "rgba(153, 102, 255, 0.5)",
            borderColor: "rgba(153, 102, 255, 1)",
          },
          {
            label: "Total",
            data: Object.values(transformedData).map((data) => data.total),
            backgroundColor: "#20C988",
            borderColor: "#",
          },
      ],
    };
  };

  const createPendingRequestChartData = (transformedData) => {//VALE KAI TA PREFFERED AGES ALLA KAI TO ALL(volunteers kai geroi)
    const labels = Object.keys(transformedData);
    const maleData = labels.map((city) => transformedData[city].male);
    const femaleData = labels.map((city) => transformedData[city].female);
    const otherData = labels.map((city) => transformedData[city].other);
    const totalData = labels.map((city) => transformedData[city].total);

    return {
      labels,
      datasets: [
        {
            label: "Male",
            data: Object.values(transformedData).map((data) => data.male),
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
          },
          {
            label: "Female",
            data: Object.values(transformedData).map((data) => data.female),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: "Other",
            data: Object.values(transformedData).map((data) => data.other),
            backgroundColor: "rgba(153, 102, 255, 0.5)",
            borderColor: "rgba(153, 102, 255, 1)",
          },
          {
            label: "Total",
            data: Object.values(transformedData).map((data) => data.total),
            backgroundColor: "#20C988",
            borderColor: "#",
          },
      ],
    };
  };

  const fetchUserReportData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:5000/volunteers/volunteer-stats"
      );
      const transformedData = transformData(data); // Transform the raw data
      const formatChartData = createChartData(transformedData); // Create chart from transformed data
      setChartData(formatChartData); // Update state with new chart data
    } catch (error) {
      console.error("Error fetching report data:", error);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOldUserReportData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:5000/oldusers/olduser-stats"
      );
      const transformedData = transformOldUserData(data);
      const chartDataForOldUser = createOldUserChartData(transformedData);
      setOldUserChartData(chartDataForOldUser);
    } catch (error) {
      console.error("Error fetching old user stats:", error);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAcceptedRequestReportData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:5000/requests/request-accepted-stats"
      );
      const transformedData = transformOldUserData(data); //line 137
      const chartDataForRequest = createAcceptedRequestChartData(transformedData);
      setAcceptedRequestChartData(chartDataForRequest);
    } catch (error) {
      console.error("Error fetching accepted requests stats:", error);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingRequestReportData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:5000/requests/request-accepted-stats"
      );
      const transformedData = transformOldUserData(data);
      const chartDataForRequest = createPendingRequestChartData(transformedData);
      setPendingRequestChartData(chartDataForRequest);
    } catch (error) {
      console.error("Error fetching accepted requests stats:", error);
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

  const options2 = {
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Beneficiary Distribution by City and Gender",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const options3 = {
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Accepted Requests Distribution by City Age and Gender",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const options4 = {
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Pending Requests Distribution by City Age and Gender",
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
                <div className="col-xs-12">
                  <div className="chart">
                    <Bar data={oldUserChartData} options={options2} />
                  </div>
                </div>
                <div className="col-xs-12">
                  {/* <div className="chart">
                    <Bar data={AcceptedRequestChartData} options={options3} />
                  </div> */}
                </div>
                <div className="col-xs-12">
                  {/* <div className="chart">
                    <Bar data={PendingRequestChartData} options={options4} />
                  </div> */}
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