import React from "react";
import { BsBoxSeam, BsCurrencyDollar } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";

import { Stacked, Pie, Button, LineChart, SparkLine } from "../../components";
import {
  earningData,
  SparklineAreaData,
  medicalproBranding,
  recentTransactions,
  weeklyStats,
  dropdownData,
  ecomPieChartData,
  pie_data,
  bar_data,
} from "../../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";
import product9 from "../../data/product9.jpg";
import "../../css/Ecommerce.scss";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../utility/AxiosInstance";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { FiBarChart } from "react-icons/fi";

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();
  const [totalProduct, setTotalProduct] = useState({
    totalCustomer: 0,
    totalProduct: 0,
    totalOrder: 0,
  });
  const [sales, setSales] = useState([
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: 0,
      title: 'Customers',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <BsBoxSeam />,
      amount: 0,
      title: 'Products',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
    {
      icon: <FiBarChart />,
      amount: 0,
      title: 'Sales',
      iconColor: 'rgb(228, 106, 118)',
      iconBg: 'rgb(255, 244, 229)',

      pcColor: 'green-600',
    },
  ]);
  const [year, setYear] = useState('');
  const [newData, setNewData] = useState([
    {
      id: "sales",
      color: "hsl(141, 70%, 50%)",
      data: [
        {
          x: "Jan",
          y: 0,
        },
        {
          x: "Feb",
          y: 0,
        },
        {
          x: "Mar",
          y: 0,
        },
        {
          x: "Apr",
          y: 0,
        },
        {
          x: "May",
          y: 0,
        },
        {
          x: "Jun",
          y: 0,
        },
        {
          x: "Jul",
          y: 0,
        },
        {
          x: "Aug",
          y: 0,
        },
        {
          x: "Sep",
          y: 0,
        },
        {
          x: "Oct",
          y: 0,
        },
        {
          x: "Nov",
          y: 0,
        },
        {
          x: "Dec",
          y: 0,
        },
      ],
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const response = await axiosInstance.get(`/restaurant-dashboard/revenue?year=${year}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.totalProduct.length > 0)
            setTotalProduct(res.data.totalProduct[0]);

          if (res.data.totalRevenue.length > 0) {
            const newDataTmp = res.data.totalRevenue[0];
            const tempArr = newData[0].data;
            var index = newDataTmp.month - 1;
            tempArr[index].y = newDataTmp.totalRevenue;
            console.log(tempArr);
          }

          // setNewData(...newData, {data: tempArr});
        })
    };
    getData();
  }, [])

  useEffect(() => {
    console.log(totalProduct);
  }, [totalProduct])

  return (
    <div>
      <div style={{ marginTop: "1%", margin: '10px 80px' }}>
        <h4>Dashboard</h4>
      </div>
      <div className="mx-20" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div className="flex flex-wrap lg:flex-nowrap justify-between w-full ">

          <div className="flex flex-wrap justify-around gap-1 items-center w-full">
            {sales.map((item) => (
              <div
                key={item.title}
                className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
                style={{ border: "1px solid #DADADA" }}
              >
                <button
                  type="button"
                  style={{
                    color: item.iconColor,
                    backgroundColor: item.iconBg,
                  }}
                  className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                >
                  {item.icon}
                </button>
                <p className="mt-3">
                  <span className="text-lg font-semibold">{
                    item.title === "Customers" ? totalProduct.totalCustomer
                      : item.title === "Products" ? totalProduct.totalProduct
                        : item.title === "Sales" ? totalProduct.totalOrder : 0
                  }</span>
                </p>
                <p className="text-sm text-gray-400  mt-1">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-between w-full ">

          <div className="flex flex-wrap justify-around gap-1 items-center w-full">
            <div className="" style={{ width: '1000px', height: '300px', backgroundColor: 'white', borderRadius: '15px', border: "1px solid rgb(218, 218, 218)" }}>
              <ResponsiveLine
                data={newData}

                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: true,
                  reverse: false,
                }}
                yFormat=" >-.2f"
                curve="catmullRom"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 0,
                  tickPadding: 5,
                  tickRotation: 0,
                  // legend: isDashboard ? undefined : "transportation", // added
                  legendOffset: 36,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  orient: "left",
                  tickValues: 5, // added
                  tickSize: 3,
                  tickPadding: 5,
                  tickRotation: 0,
                  // legend: isDashboard ? undefined : "count", // added
                  legendOffset: -40,
                  legendPosition: "middle",
                }}
                enableGridX={false}
                enableGridY={false}
                pointSize={8}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
