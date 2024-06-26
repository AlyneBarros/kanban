import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Column from "./Column";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./RecursoContainer.css";

// Definição da URL do serviço e credenciais
const serviceUrl =
  "https://apps.uniaoquimica.com.br:44301/sap/opu/odata/sap/ZKANBAN_SRV/";
const username = "usr_webapp";
const password = "Uqfn@2020@#";

// Definição das etapas fixas do processo

// const fixedProcessOrder = [
//   "PESAGEM",
//   "ACONDICIONAR",
//   "GRANULACAO",
//   "COMPRESSÃO",
//   "PREPARAÇÃO",
//   "DRAGEADORA",
//   "EQUALIZACAO",
//   "ESCOLHA",
//   "EMBALAGEM",
//   "REVISÃO DOCUMENTAÇÃO",
// ];

function Home() {
  // Definição dos estados do componente
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
  const [containerHeight, setContainerHeight] = useState("89vh");
  const [defaultSizes, setDefaultSizes] = useState({
    cardWidth: "350px",
    columnWidth: "350px",
    containerHeight: "89vh",
  });
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
  const [scrollSpeed] = useState(5);
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef(null);
  const [showAllColumns, setShowAllColumns] = useState(true);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false);
  const [operacao, setOperacao] = useState([]);

  // Hook para buscar dados ao montar o componente
  useEffect(() => {
    fetchOrdemColunas();
    const intervalId = setInterval(fetchData, 300000); // 300000 ms = 5 minutos
    const intervalIdOrdemColunas = setInterval(fetchOrdemColunas, 300000); // Atualização automática de fetchOrdemColunas a cada 5 minutos
    return () => {
      clearInterval(intervalId);
      clearInterval(intervalIdOrdemColunas);
    }; // Limpa os intervalos ao desmontar o componente
  }, []);

  // Hook para lidar com hash na URL para navegação inicial
  useEffect(() => {
    const hash = window.location.hash.substr(1); // Obtém o hash da URL
    if (hash) {
      const [centro, area] = hash.split("&"); // Divide o hash em partes
      handleAreaClick(area, centro);
    }
  }, []);

  // Hook para habilitar/desabilitar rolagem automática
  useEffect(() => {
    if (autoScrollEnabled) {
      const container = scrollContainerRef.current;
      if (container) {
        const intervalId = setInterval(() => {
          container.scrollLeft += scrollSpeed;
        }, 1000 / scrollSpeed);

        return () => clearInterval(intervalId);
      }
    }
  }, [autoScrollEnabled, scrollSpeed]);

  // Função para buscar dados da API
  const fetchData = async () => {
    try {
      setLoading(true); // Inicia o estado de carregamento
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

      const ordersOfSg00 = responseOrders.data.d.results;

      // Find duplicates with different `Iniciado` status
      const orderMap = {};
      ordersOfSg00.forEach(order => {
        if (!orderMap[order.OrderNumber]) {
          orderMap[order.OrderNumber] = [];
        }
        orderMap[order.OrderNumber].push(order);
      });

      const updatedOrders = ordersOfSg00.map(order => {
        const duplicates = orderMap[order.OrderNumber];
        const isDuplicatedNotStarted = duplicates.some(
          o => o.Iniciado !== order.Iniciado && !order.Iniciado
        );
        return { ...order, isDuplicatedNotStarted };
      });

      setOrders(updatedOrders);

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

      const areasData = responseAreas.data.d.results.map((item) => item.Area);
      const uniqueAreas = [...new Set(areasData)].filter((area) => area);
      setAreas(uniqueAreas);

      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error("Erro ao buscar dados da API OData:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  ;

  // Fetching operacao data and setting state
  useEffect(() => {
    fetchOrdemColunas();
  }, []);
  
  // Função para definir tamanhos padrão dos componentes
  const handleSetDefaultSizes = () => {
    setCardWidth(defaultSizes.cardWidth);
    setColumnWidth(defaultSizes.columnWidth);
    setContainerHeight(defaultSizes.containerHeight);
  };

  // Função para definir tamanhos personalizados dos componentes
  const handleSetCustomSizes = (cardWidth, columnWidth, containerHeight) => {
    setDefaultSizes({ cardWidth, columnWidth, containerHeight });
    setCardWidth(cardWidth);
    setColumnWidth(columnWidth);
    setContainerHeight(containerHeight);
  };

  // Função para lidar com cliques nas áreas
  const handleAreaClick = async (area) => {
    try {
      setLoading(true); // Inicia o estado de carregamento
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
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error("Erro ao buscar dados da API OData:", error);
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  // Função para buscar as ordens das colunas
  const fetchOrdemColunas = async () => {
    try {
      setLoading(true); // Inicia o estado de carregamento
      const auth = btoa(`${username}:${password}`);
      const responseOrdemColunas = await axios.get(
        `${serviceUrl}/OperacaoSet/?$filter=Centro eq 'SG00'&$orderby=Sequencia&$format=json`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
            Accept: "application/json",
          }
        }
      );

      const operationArray = responseOrdemColunas.data.d.results;
      const operationNames = operationArray.map(operation => operation.Processo);

      // Adiciona o processo manualmente
      operationNames.push("REVISÃO DOCUMENTAÇÃO");

      setOperacao(operationNames);
      fetchData();
    } catch (error) {
      console.error("Erro ao buscar dados da API OData:", error);
    } finally {
      setLoading(false);
    }
  };

  // Funções para alternar estados de rolagem e atualização automáticas
  const handleToggleAutoScroll = () => {
    setAutoScrollEnabled(!autoScrollEnabled);
  };

  const handleToggleAutoRefresh = () => {
    setAutoRefreshEnabled(!autoRefreshEnabled);
  };

  return (
    <div
      ref={scrollContainerRef} // Adiciona a referência ao elemento de contêiner
      className="flex h-screen overflow-hidden bg-[#f4f7fd] dark:bg-[#20212c] overflow-x-scroll scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100"
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
        onRefresh={fetchData}
        lastUpdated={lastUpdated}
        loading={loading}
        scrollContainerRef={scrollContainerRef} // Passa a referência do contêiner de rolagem
        showAllColumns={showAllColumns}
        setShowAllColumns={setShowAllColumns}
        onToggleAutoScroll={handleToggleAutoScroll} // Passa a função de alternar rolagem automática para Header
        autoRefreshEnabled={autoRefreshEnabled}
        onToggleAutoRefresh={handleToggleAutoRefresh}
        fetchOrdemColunas={fetchOrdemColunas}
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
          {operacao.map((processo, index) => {
  const ordersOfProcess = orders.filter(
    (order) => order.Processo === processo
  );
  if (!showAllColumns && ordersOfProcess.length === 0) {
    return null;
  }
  return (
    <Column
      key={index}
      descProcesso={processo}
      orders={ordersOfProcess}
      cardWidth={cardWidth}
      columnWidth={columnWidth}
      containerHeight={containerHeight}
      showAllColumns={showAllColumns}
      operacao={operacao} // Pass operacao as a prop
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
