// Home.js
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Column from "./Column";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./RecursoContainer.css";

const serviceUrl = "https://apps.uniaoquimica.com.br:44301/sap/opu/odata/sap/ZKANBAN_SRV/";
const username = "usr_webapp";
const password = "Uqfn@2020@#";

const fixedProcessOrder = [
  "PESAGEM",
  "GRANULAÇAO",
  "COMPRESSAO",
  "DRAGEADORA",
  "EQUALIZACAO",
  "ESCOLHA",
  "EMBALAGEM",
  "REVISÃO DOCUMENTAÇÃO",
];

function Home() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [orders, setOrders] = useState([]);
  const [areas, setAreas] = useState([]);
  const [genomTitle, setGenomTitle] = useState("");
  const [areaTitle, setAreaTitle] = useState("");
  const [uniqueOrderCount, setUniqueOrderCount] = useState(0);
  const [startedOrderCount, setStartedOrderCount] = useState(0);
  const [waitingOrderCount, setWaitingOrderCount] = useState(0);
  const [cardWidth, setCardWidth] = useState("350px");
  const [columnWidth, setColumnWidth] = useState("350px");
  const [containerHeight, setContainerHeight] = useState("87vh");
  const [defaultSizes, setDefaultSizes] = useState({
    cardWidth: "350px",
    columnWidth: "350px",
    containerHeight: "87vh",
  });
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(5);
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef(null);


  
  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  useEffect(() => {
    const hash = window.location.hash.substr(1); // Obtém o hash da URL
    if (hash) {
        // Divide a hash em partes separadas pelo caractere "&"
        const [centro, area] = hash.split("&");

        // Lógica para lidar com a navegação inicial com base no centro e na área
        handleAreaClick(area, centro);
    }
}, []);

useEffect(() => {
  // Verifique se o auto scroll está ativado
  if (autoScrollEnabled) {
    // Obtenha o elemento do contêiner de rolagem usando a referência
    const container = scrollContainerRef.current;
    // Verifique se o contêiner existe e o role automaticamente
    if (container) {
      // Use um intervalo para rolar o contêiner horizontalmente
      const intervalId = setInterval(() => {
        // Atualize a posição de rolagem do contêiner
        container.scrollLeft += scrollSpeed;
      }, 1000 / scrollSpeed); // Ajuste a velocidade de acordo com scrollSpeed

      // Retorne uma função de limpeza para limpar o intervalo quando o componente é desmontado
      return () => clearInterval(intervalId);
    }
  }
}, [autoScrollEnabled, scrollSpeed]); // Dependências do efeito

  const fetchData = async () => {
    try {
      setLoading(true); // Start loading
      const auth = btoa(`${username}:${password}`);

      const responseOrders = await axios.get(
        `${serviceUrl}/OrdemSet?$filter=Centro eq 'SG00' and Area eq 'SOLIDOS'&sap-client=300`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
            Accept: "application/json",
          },
        }
      );

      console.log("Orders response:", responseOrders.data);

      const ordersOfSg00 = responseOrders.data.d.results;
      setOrders(ordersOfSg00);

      if (ordersOfSg00.length > 0) {
        const uniqueOrders = new Set(
          ordersOfSg00.map((order) => order.OrderNumber)
        );
        setUniqueOrderCount(uniqueOrders.size);

        const startedOrders = ordersOfSg00.filter(
          (order) => order.Iniciado === true
        );
        const waitingOrders = ordersOfSg00.filter((order) => !order.Iniciado);

        setStartedOrderCount(startedOrders.length);
        setWaitingOrderCount(waitingOrders.length);

        setGenomTitle(
          ordersOfSg00[0].Centro === "SG00" ? "Genom" : ordersOfSg00[0].Centro
        );
        setAreaTitle(ordersOfSg00[0].Area);
      }

      const responseAreas = await axios.get(
        `${serviceUrl}/OrdemSet?$select=Area&$filter=Centro eq 'SG00' and Area eq 'SOLIDOS'&$format=json`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
            Accept: "application/json",
          },
        }
      );

      console.log("Areas response:", responseAreas.data);

      const areasData = responseAreas.data.d.results.map((item) => item.Area);
      const uniqueAreas = [...new Set(areasData)].filter((area) => area);
      setAreas(uniqueAreas);
      setLastUpdated(new Date().toLocaleString()); // Update last updated time
    } catch (error) {
      console.error("Erro ao buscar dados da API OData:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleSetDefaultSizes = () => {
    setCardWidth(defaultSizes.cardWidth);
    setColumnWidth(defaultSizes.columnWidth);
    setContainerHeight(defaultSizes.containerHeight);
  };

  const handleSetCustomSizes = (cardWidth, columnWidth, containerHeight) => {
    setDefaultSizes({ cardWidth, columnWidth, containerHeight });
    setCardWidth(cardWidth);
    setColumnWidth(columnWidth);
    setContainerHeight(containerHeight);
  };

  const handleAreaClick = async (area) => {
    try {
      setLoading(true); // Start loading
      const auth = btoa(`${username}:${password}`);
      const responseOrders = await axios.get(
        `${serviceUrl}/OrdemSet?$filter=Centro eq 'SG00' and Area eq '${area}'`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
            Accept: "application/json",
          },
        }
      );

      console.log(`Orders for area ${area}:`, responseOrders.data);

      const ordersOfArea = responseOrders.data.d.results;
      setOrders(ordersOfArea);

      if (ordersOfArea.length > 0) {
        const uniqueOrders = new Set(
          ordersOfArea.map((order) => order.OrderNumber)
        );
        setUniqueOrderCount(uniqueOrders.size);

        const startedOrders = ordersOfArea.filter(
          (order) => order.Iniciado === true
        );
        const waitingOrders = ordersOfArea.filter((order) => !order.Iniciado);

        setStartedOrderCount(startedOrders.length);
        setWaitingOrderCount(waitingOrders.length);

        setGenomTitle(
          ordersOfArea[0].Centro === "SG00" ? "Genom" : ordersOfArea[0].Centro
        );
        setAreaTitle(ordersOfArea[0].Area);
      }
      setLastUpdated(new Date().toLocaleString()); // Update last updated time
    } catch (error) {
      console.error("Erro ao buscar dados da API OData:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div ref={scrollContainerRef} // Adicione a referência ao elemento de contêiner
    className={`flex h-screen overflow-hidden bg-[#f4f7fd] dark:bg-[#20212c] overflow-x-scroll scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100`}
  >
      <Header
        uniqueOrderCount={uniqueOrderCount}
        startedOrderCount={startedOrderCount}
        waitingOrderCount={waitingOrderCount}
        setCustomSizes={handleSetCustomSizes}
        setDefaultSizes={handleSetDefaultSizes}
        defaultSizes={defaultSizes}
        genomTitle={genomTitle}
        areaTitle={areaTitle}
        onRefresh={fetchData} // Pass the refresh function to Header
        lastUpdated={lastUpdated} // Pass the last updated time to Header
        loading={loading} // Pass the loading state to Header
        scrollContainerRef={scrollContainerRef} // Pass the scroll container reference
      />

      <Sidebar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        areas={areas}
        onAreaClick={handleAreaClick}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSideBarOpen ? "ml-[261px]" : "ml-0"
        }`}
      >
        <header className="flex items-center justify-between p-4 bg-white dark:bg-[#2b2c37] shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {genomTitle}
          </h1>
        </header>

        <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
          <div className="flex space-x-4 min-w-max">
            {fixedProcessOrder.map((processo, index) => {
              const ordersOfProcess = orders.filter(
                (order) => order.Processo === processo
              );
              return (
                <Column
                  key={index}
                  descProcesso={processo}
                  orders={ordersOfProcess}
                  cardWidth={cardWidth}
                  columnWidth={columnWidth}
                  containerHeight={containerHeight}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
