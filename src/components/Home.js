import React, { useEffect, useState } from "react";
import axios from "axios";
import Column from "./Column";
import Sidebar from "./Sidebar";

const serviceUrl = 'https://apps.uniaoquimica.com.br:44301/sap/opu/odata/sap/ZKANBAN_SRV';
const username = 'usr_webapp';
const password = 'Uqfn@2020@#';

function Home() {
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [orders, setOrders] = useState([]);
  const [kanbanHeader, setKanbanHeader] = useState('');
  const [boardSlice, setBoardSlice] = useState('');

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = btoa(`${username}:${password}`);
        const responseOrders = await axios.get(`${serviceUrl}/OrdemSet?$filter=Centro eq 'SG00' and Area eq 'SOLIDOS'`, {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Accept': 'application/json'
          }
        });
        
        const ordersOfSg00 = responseOrders.data.d.results;
        setOrders(ordersOfSg00);

        // Set Kanban Header and Board Slice
        if (ordersOfSg00.length > 0) {
          setKanbanHeader(ordersOfSg00[0].Centro);
          setBoardSlice(ordersOfSg00[0].Area);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API OData:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f7fd] dark:bg-[#20212c]">
      {/* Sidebar */}
      <Sidebar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSideBarOpen ? 'ml-[261px]' : 'ml-0'
        }`}
      >
        <header className="flex items-center justify-between p-4 bg-white dark:bg-[#2b2c37] shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{kanbanHeader}</h1>
        </header>

        <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
          {orders.length > 0 ? (
            <div className="flex space-x-4">
              {Array.from(new Set(orders.map(order => order.Processo))).map((processo, index) => (
                <Column 
                  key={index} 
                  descProcesso={processo} 
                  orders={orders.filter(order => order.Processo === processo)} 
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-900 dark:text-gray-100">Nenhum dado disponível</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
