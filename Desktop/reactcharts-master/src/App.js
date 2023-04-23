import React, { useState, useEffect } from "react";
import logo from "./logo.png";
import "./App.css";
import BarChart from "./components/BarChart";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import axios from "axios";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import MyCard from "./components/MyCard";
import { Grid } from "@material-ui/core";
import MyTable from "./components/MyTableau";
import { CircularProgress } from "@material-ui/core";
function App() {
  const byClientColumns = [
    "client name",
    "number Of Commands",
    "number Of Commands Validated",
    "number Of Text Commanded ",
    "number Of Text Delivered",
    "number Of Text Validated",
  ];
  const byDevisColumns = [
    "devis name",
    "number Of Text livered",
    "number Of text Validated",
  ];
  const byDevisDetailsColumns = [
    "devis detail name",
    "number Of Text livered",
    "number Of text Validated",
  ];
  const now = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [loadedData, setLoadedData] = useState(false);
  const [statByClient, setStatByClient] = useState(null);
  const [statByDevis, setStatByDevis] = useState(null);
  const [statByDevisDetailed, setStatByDevisDetailed] = useState(null);
  const currentMonthName = months[now.getMonth()];
  const labelsMonths = [
    months[(now.getMonth() + 7) % 12],
    months[(now.getMonth() + 8) % 12],
    months[(now.getMonth() + 9) % 12],
    months[(now.getMonth() + 10) % 12],
    months[(now.getMonth() + 11) % 12],
    months[now.getMonth()],
  ];
  const [viewData, setViewData] = useState(0);
  const [AllTimeData, setAllTimeData] = useState({
    numberOfClients: 0,
    numberOfWebsites: 0,
    deliveredTextsEverCount: 0,
    validatedTextsEverCount: 0,
  });
  const [chartCommandsValidatedData, setChartCommandsValidated] = useState({
    labels: labelsMonths,
    datasets: [
      {
        label: "Commands",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  });
  const [chartCommandsDeliveredData, setChartCommandsDelivered] = useState({
    labels: labelsMonths,
    datasets: [
      {
        label: "Commands",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  });

  const [chartCommandsCreatededData, setChartCommandsCreated] = useState({
    labels: labelsMonths,
    datasets: [
      {
        label: "Commands",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  });

  const [textCommandedNumberData, setTextCommandedNumberData] = useState({
    labels: labelsMonths,
    datasets: [
      {
        label: "Text",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  });
  const [textDeliveredNumberData, setTextDeliveredNumberData] = useState({
    labels: labelsMonths,
    datasets: [
      {
        label: "Text",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  });
  const [textValidatedNumberData, setTextValidatedNumberData] = useState({
    labels: labelsMonths,
    datasets: [
      {
        label: "Text",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  });
  

  const [CommandsNumberByClientData, setCommandsNumberByClient] = useState({
    labels: labelsMonths,
    datasets: [
      {
        label: "Commands",
        data: [10, 20, 0, 0, 0, 0],
        backgroundColor: [],
      },
    ],
  });
  const [CommandsValidatedByClientData, setCommandsValidatedByClient] = useState({
    labels: labelsMonths,
    datasets: [
      {
        label: "Commands",
        data: [10, 20, 0, 0, 0, 0],
        backgroundColor: [],
      },
    ],
  });
  const [CommandsDeliveredByClientData, setCommandsDeliveredByClient] = useState({
    labels: labelsMonths,
    datasets: [
      {
        label: "Population",
        data: [10, 20, 0, 0, 0, 0],
        backgroundColor: [],
      },
    ],
  });

  function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const [avril, mars, february, janvier, december, november] =
          await Promise.all([
            axios.get(
              "http://typixbilan.eastus.cloudapp.azure.com:8080/typix-bilan/getGlobalBilanByPeriod?indexEndMonth=0&indexStartMonth=1"
            ),
            axios.get(
              "http://typixbilan.eastus.cloudapp.azure.com:8080/typix-bilan/getGlobalBilanByPeriod?indexEndMonth=1&indexStartMonth=2"
            ),
            axios.get(
              "http://typixbilan.eastus.cloudapp.azure.com:8080/typix-bilan/getGlobalBilanByPeriod?indexEndMonth=2&indexStartMonth=3"
            ),
            axios.get(
              "http://typixbilan.eastus.cloudapp.azure.com:8080/typix-bilan/getGlobalBilanByPeriod?indexEndMonth=3&indexStartMonth=4"
            ),
            axios.get(
              "http://typixbilan.eastus.cloudapp.azure.com:8080/typix-bilan/getGlobalBilanByPeriod?indexEndMonth=4&indexStartMonth=5"
            ),
            axios.get(
              "http://typixbilan.eastus.cloudapp.azure.com:8080/typix-bilan/getGlobalBilanByPeriod?indexEndMonth=5&indexStartMonth=6"
            ),
          ]);

        const [byClient, byDevis, ByDevisDetailed] = await Promise.all([
          axios.get(
            "http://typixbilan.eastus.cloudapp.azure.com:8080/typix-bilan/getCommandsDataByClientInPeriod?indexEndMonth=0&indexStartMonth=1"
          ),
          axios.get(
            "http://typixbilan.eastus.cloudapp.azure.com:8080/typix-bilan/getCommandsDataByDevisInPeriod?indexEndMonth=0&indexStartMonth=1"
          ),
          axios.get(
            "http://typixbilan.eastus.cloudapp.azure.com:8080/typix-bilan/getCommandsDataByDevisDetailInPeriod?indexEndMonth=0&indexStartMonth=1"
          ),
        ]);
        setStatByClient(byClient.data);
        setStatByDevis(byDevis.data);
        setStatByDevisDetailed(ByDevisDetailed.data);
        const chartCommandsValidatedDataCopy = {
          ...chartCommandsValidatedData,
        };
        const chartCommandsDeliveredDataCopy = {
          ...chartCommandsDeliveredData,
        };
        const chartCommandsCreatedDataCopy = { ...chartCommandsCreatededData };
        const textCommandedNumberDataCopy = { ...textCommandedNumberData };
        const textDeliveredNumberDataCopy = { ...textDeliveredNumberData };
        const textValidatedNumberDataCopy = { ...textValidatedNumberData };
        const chartCommandsByClientDataCopy = {
          ...CommandsNumberByClientData,
        };
        const chartCommandsDeliveredByClientDataCopy = {
          ...CommandsDeliveredByClientData,
        };
        const chartCommandsValidatedByClientDataCopy = {
          ...CommandsValidatedByClientData,
        };

        let numberOfClients = avril.data.numberOfClients;
        let numberOfWebsites = avril.data.numberOfWebsites;
        let deliveredTextsEverCount = avril.data.deliveredTextsEverCount;
        let validatedTextsEverCount = avril.data.validatedTextsEverCount;
        //command created by Client
        chartCommandsByClientDataCopy.labels = byClient.data.map(
          (client) => client.nameClient
        );
        chartCommandsByClientDataCopy.datasets[0].data = byClient.data.map(
          (client) => client.numberOfCommands
        );
        chartCommandsByClientDataCopy.datasets[0].backgroundColor = byClient.data.map((client) => getRandomColor()); 
        //command delivered by Client

        chartCommandsDeliveredByClientDataCopy.labels = byClient.data.map(
          (client) => client.nameClient
        );
        chartCommandsDeliveredByClientDataCopy.datasets[0].data = byClient.data.map(
          (client) => client.numberOfTextDelivered
        );
        chartCommandsDeliveredByClientDataCopy.datasets[0].backgroundColor = byClient.data.map((client) => getRandomColor()); 

        //command validated by Client

        chartCommandsValidatedByClientDataCopy.labels = byClient.data.map(
          (client) => client.nameClient
        );
        chartCommandsValidatedByClientDataCopy.datasets[0].data = byClient.data.map(
          (client) => client.numberOfTextValidated
        );
        chartCommandsValidatedByClientDataCopy.datasets[0].backgroundColor = byClient.data.map((client) => getRandomColor()); 


        setCommandsNumberByClient(chartCommandsByClientDataCopy);
        setCommandsDeliveredByClient(chartCommandsDeliveredByClientDataCopy);
        setCommandsValidatedByClient(chartCommandsValidatedByClientDataCopy);
        setAllTimeData({
          numberOfClients,
          numberOfWebsites,
          deliveredTextsEverCount,
          validatedTextsEverCount,
        });
        chartCommandsValidatedDataCopy.datasets[0].data = [
          november.data.commandsValidateNumber,
          december.data.commandsValidateNumber,
          janvier.data.commandsValidateNumber,
          february.data.commandsValidateNumber,
          mars.data.commandsValidateNumber,
          avril.data.commandsValidateNumber,
        ];
        setChartCommandsValidated(chartCommandsValidatedDataCopy);
        // chartCommandsDeliveredDataCopy
        chartCommandsDeliveredDataCopy.datasets[0].data = [
          november.data.commandsLiveredNumber,
          december.data.commandsLiveredNumber,
          janvier.data.commandsLiveredNumber,
          february.data.commandsLiveredNumber,
          mars.data.commandsLiveredNumber,
          avril.data.commandsLiveredNumber,
        ];
        setChartCommandsDelivered(chartCommandsDeliveredDataCopy);

        // chartCommandsCreatedDataCopy
        chartCommandsCreatedDataCopy.datasets[0].data = [
          november.data.commandsCreatedNumber,
          december.data.commandsCreatedNumber,
          janvier.data.commandsCreatedNumber,
          february.data.commandsCreatedNumber,
          mars.data.commandsCreatedNumber,
          avril.data.commandsCreatedNumber,
        ];
        setChartCommandsCreated(chartCommandsCreatedDataCopy);

        // textCommandedNumberDataCopy
        textCommandedNumberDataCopy.datasets[0].data = [
          november.data.textCommandedNumber,
          december.data.textCommandedNumber,
          janvier.data.textCommandedNumber,
          february.data.textCommandedNumber,
          mars.data.textCommandedNumber,
          avril.data.textCommandedNumber,
        ];
        setTextCommandedNumberData(textCommandedNumberDataCopy);

        // textDeliveredNumberDataCopy
        textDeliveredNumberDataCopy.datasets[0].data = [
          november.data.deliveredTextsLastMonthCount,
          december.data.deliveredTextsLastMonthCount,
          janvier.data.deliveredTextsLastMonthCount,
          february.data.deliveredTextsLastMonthCount,
          mars.data.deliveredTextsLastMonthCount,
          avril.data.deliveredTextsLastMonthCount,
        ];
        setTextDeliveredNumberData(textDeliveredNumberDataCopy);

        // textValidatedNumberDataCopy
        textValidatedNumberDataCopy.datasets[0].data = [
          november.data.validatedTextsLastMonthCount,
          december.data.validatedTextsLastMonthCount,
          janvier.data.validatedTextsLastMonthCount,
          february.data.validatedTextsLastMonthCount,
          mars.data.validatedTextsLastMonthCount,
          avril.data.validatedTextsLastMonthCount,
        ];
        setTextValidatedNumberData(textValidatedNumberDataCopy);

        setTextValidatedNumberData(textValidatedNumberDataCopy);
        setLoadedData(true);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button
            color="inherit"
            onClick={() => {
              setViewData(0);
            }}
          >
            {" "}
            <h2>Global</h2>
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              setViewData(1);
            }}
          >
            {" "}
            <h2>By Client</h2>
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              setViewData(2);
            }}
          >
            {" "}
            <h2>By Devis</h2>
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              setViewData(3);
            }}
          >
            {" "}
            <h2>By Devis Detail</h2>
          </Button>
        </Toolbar>
      </AppBar>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to Typix Bilan</h2>
      </div>
      <div></div>
      {!loadedData && (
        <div>
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
          wait for data to load from the database
        </div>
      )}
      {viewData == 0 && loadedData && (
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <MyCard
                title="Total Number of Clients"
                value={AllTimeData.numberOfClients}
                color="rgba(255, 99, 132, 0.6)"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MyCard
                title="Total Number of Websites"
                value={AllTimeData.numberOfWebsites}
                color="rgba(54, 162, 235, 0.6)"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MyCard
                title="Total Number of Text Delivered"
                value={AllTimeData.deliveredTextsEverCount}
                color="rgba(255, 206, 86, 0.6)"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MyCard
                title="Total Number of Text Validated"
                value={AllTimeData.validatedTextsEverCount}
                color="rgba(75, 192, 192, 0.6)"
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <BarChart
                chartData={chartCommandsValidatedData}
                chartName="Number Of Commands Validated"
                location="Massachusetts"
                legendPosition="bottom"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <BarChart
                chartData={chartCommandsDeliveredData}
                chartName="Number Of Commands Delivered"
                location="Massachusetts"
                legendPosition="bottom"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <BarChart
                chartData={chartCommandsCreatededData}
                chartName="Number Of Commands Created"
                location="Massachusetts"
                legendPosition="bottom"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <LineChart
                chartData={textCommandedNumberData}
                chartName="Number Of Text Commanded"
                location="Massachusetts"
                legendPosition="bottom"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <LineChart
                chartData={textDeliveredNumberData}
                chartName="Number Of Text Delivered"
                location="Massachusetts"
                legendPosition="bottom"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <LineChart
                chartData={textValidatedNumberData}
                chartName="Number Of Text Validated"
                location="Massachusetts"
                legendPosition="bottom"
              />
            </Grid>
          </Grid>
        </div>
      )}
      {viewData == 1 && loadedData && (
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <PieChart
                chartData={CommandsNumberByClientData}
                chartName="Number Of Commands Created"
                location="Massachusetts"
                legendPosition="bottom"
              />
            </Grid>
        
       
            <Grid item xs={12} sm={4}>
              <PieChart
                chartData={CommandsDeliveredByClientData}
                chartName="Number Of Text Delivered"
                location="Massachusetts"
                legendPosition="bottom"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <PieChart
                chartData={CommandsValidatedByClientData}
                chartName="Number Of Text Validated"
                location="Massachusetts"
                legendPosition="bottom"
              />
            </Grid>
          </Grid>
          <MyTable data={statByClient} columns={byClientColumns} />
        </div>
      )}
      {viewData == 2 && loadedData && (
        <MyTable data={statByDevis} columns={byDevisColumns} />
      )}
      {viewData == 3 && loadedData && (
        <MyTable data={statByDevisDetailed} columns={byDevisDetailsColumns} />
      )}
    </div>
  );
}

export default App;
