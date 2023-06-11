import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
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
  data,
  bar_data,
} from "../../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";
import product9 from "../../data/product9.jpg";
import "../../css/Ecommerce.scss";
import { blue } from "@mui/material/colors";
const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();

  return (
    <div>
      <div style={{ marginTop: "1%", margin: '10px 80px' }}>
        <h4>Dashboard</h4>
      </div>
      <div className="mx-20">
        <div className="flex flex-wrap lg:flex-nowrap justify-between w-full ">
          
          <div className="flex flex-wrap justify-around gap-1 items-center w-full">
            {earningData.map((item) => (
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
                  <span className="text-lg font-semibold">{item.amount}</span>
                </p>
                <p className="text-sm text-gray-400  mt-1">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-10 flex-wrap justify-center">
          <div
            className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  "
            style={{ border: "1px solid #DADADA" }}
          >
            <div className="flex justify-between">
              <p className="font-semibold text-xl">Revenue Updates</p>
              <div className="flex items-center gap-4">
                <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                  <span>
                    <GoPrimitiveDot />
                  </span>
                  <span>Expense</span>
                </p>
                <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                  <span>
                    <GoPrimitiveDot />
                  </span>
                  <span>Budget</span>
                </p>
              </div>
            </div>
            <div className="mt-10 flex gap-10 flex-wrap justify-center">
              <div className=" border-r-1 border-color m-4 pr-10">
                <div>
                  <p>
                    <span className="text-3xl font-semibold">$93,438</span>
                    <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                      23%
                    </span>
                  </p>
                  <p className="text-gray-500 mt-1">Budget</p>
                </div>
                <div className="mt-8">
                  <p className="text-3xl font-semibold">$48,487</p>

                  <p className="text-gray-500 mt-1">Expense</p>
                </div>

                <div className="mt-10">
                  <Button
                    color="white"
                    bgColor={currentColor}
                    text="Download Report"
                    borderRadius="10px"
                  />
                </div>
              </div>
              <div className="chart_1">
                <ResponsiveLine
                  data={data}
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
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "transportation",
                    legendOffset: 36,
                    legendPosition: "middle",
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "count",
                    legendOffset: -40,
                    legendPosition: "middle",
                  }}
                  pointSize={10}
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
          <div>
            <div
              className=" rounded-2xl md:w-400 p-4 m-3"
              style={{
                backgroundColor: currentColor,
                border: "1px solid #DADADA",
              }}
            >
              <div className="flex justify-between items-center ">
                <p className="font-semibold text-white text-2xl">Earnings</p>

                <div>
                  <p className="text-2xl text-white font-semibold mt-8">
                    $63,448.78
                  </p>
                  <p className="text-gray-200">Monthly revenue</p>
                </div>
              </div>

              <div className="mt-4">
                <SparkLine
                  currentColor={currentColor}
                  id="column-sparkLine"
                  height="100px"
                  type="Column"
                  data={SparklineAreaData}
                  width="320"
                  color="rgb(242, 252, 253)"
                />
              </div>
            </div>

            <div
              className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10"
              style={{ border: "1px solid #DADADA" }}
            >
              <div>
                <p className="text-2xl font-semibold ">$43,246</p>
                <p className="text-gray-400">Yearly sales</p>
              </div>

              <div className="w-40">
                <div className="chart_2">
                  <ResponsivePie
                    data={pie_data}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                      from: "color",
                      modifiers: [["darker", 0.2]],
                    }}
                    enableArcLinkLabels={false}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: "color" }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                      from: "color",
                      modifiers: [["darker", 2]],
                    }}
                    defs={[
                      {
                        id: "dots",
                        type: "patternDots",
                        background: "inherit",
                        color: "rgba(255, 255, 255, 0.3)",
                        size: 4,
                        padding: 1,
                        stagger: true,
                      },
                      {
                        id: "lines",
                        type: "patternLines",
                        background: "inherit",
                        color: "rgba(255, 255, 255, 0.3)",
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                      },
                    ]}
                    fill={[
                      {
                        match: {
                          id: "ruby",
                        },
                        id: "dots",
                      },
                      {
                        match: {
                          id: "c",
                        },
                        id: "dots",
                      },
                      {
                        match: {
                          id: "go",
                        },
                        id: "dots",
                      },
                      {
                        match: {
                          id: "python",
                        },
                        id: "dots",
                      },
                      {
                        match: {
                          id: "scala",
                        },
                        id: "lines",
                      },
                      {
                        match: {
                          id: "lisp",
                        },
                        id: "lines",
                      },
                      {
                        match: {
                          id: "elixir",
                        },
                        id: "lines",
                      },
                      {
                        match: {
                          id: "javascript",
                        },
                        id: "lines",
                      },
                    ]}
                    legends={[
                      {
                        anchor: "right",
                        direction: "column",
                        justify: false,
                        translateX: 60,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 80,
                        itemHeight: 49,
                        itemTextColor: "#999",
                        itemDirection: "left-to-right",
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: "circle",
                        effects: [
                          {
                            on: "hover",
                            style: {
                              itemTextColor: "#000",
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

        <div className="flex gap-10 m-4 flex-wrap justify-center">
          <div
            className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl"
            style={{ border: "1px solid #DADADA" }}
          >
            <div className="flex justify-between items-center gap-2">
              <p className="text-xl font-semibold">Recent Transactions</p>
              <DropDown currentMode={currentMode} />
            </div>
            <div className="mt-10 w-72 md:w-400">
              {recentTransactions.map((item) => (
                <div key={item.title} className="flex justify-between mt-4">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      style={{
                        color: item.iconColor,
                        backgroundColor: item.iconBg,
                      }}
                      className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                    >
                      {item.icon}
                    </button>
                    <div>
                      <p className="text-md font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                  <p className={`text-${item.pcColor}`}>{item.amount}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-5 border-t-1 border-color">
              <div className="mt-3">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Add"
                  borderRadius="10px"
                />
              </div>

              <p className="text-gray-400 text-sm">36 Recent Transactions</p>
            </div>
          </div>
          <div
            className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760"
            style={{ border: "1px solid #DADADA" }}
          >
            <div className="flex justify-between items-center gap-2 mb-10">
              <p className="text-xl font-semibold">Sales Overview</p>
              <DropDown currentMode={currentMode} />
            </div>
            <div className="md:w-full overflow-auto">
              <div className="chart_3">
                <ResponsiveBar
                  data={bar_data}
                  keys={[
                    "hot dog",
                    "burger",
                    "sandwich",
                    "kebab",
                    "fries",
                    "donut",
                  ]}
                  indexBy="country"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  colors={{ scheme: "nivo" }}
                  defs={[
                    {
                      id: "dots",
                      type: "patternDots",
                      background: "inherit",
                      color: "#38bcb2",
                      size: 4,
                      padding: 1,
                      stagger: true,
                    },
                    {
                      id: "lines",
                      type: "patternLines",
                      background: "inherit",
                      color: "#eed312",
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10,
                    },
                  ]}
                  fill={[
                    {
                      match: {
                        id: "fries",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "sandwich",
                      },
                      id: "lines",
                    },
                  ]}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", "1.5"]],
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "country",
                    legendPosition: "middle",
                    legendOffset: 32,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "food",
                    legendPosition: "middle",
                    legendOffset: -40,
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                  }}
                  legends={[
                    {
                      dataFrom: "keys",
                      anchor: "bottom-right",
                      direction: "column",
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 2,
                      itemWidth: 99,
                      itemHeight: 33,
                      itemDirection: "left-to-right",
                      itemOpacity: 0.85,
                      symbolSize: 19,
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]}
                  role="application"
                  ariaLabel="Nivo bar chart demo"
                  barAriaLabel={(e) =>
                    e.id +
                    ": " +
                    e.formattedValue +
                    " in country: " +
                    e.indexValue
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          <div
            className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3"
            style={{ border: "1px solid #DADADA" }}
          >
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Weekly Stats</p>
              <button
                type="button"
                className="text-xl font-semibold text-gray-500"
              >
                <IoIosMore />
              </button>
            </div>

            <div className="mt-10 ">
              {weeklyStats.map((item) => (
                <div
                  key={item.title}
                  className="flex justify-between mt-4 w-full"
                >
                  <div className="flex gap-4">
                    <button
                      type="button"
                      style={{ background: item.iconBg }}
                      className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                    >
                      {item.icon}
                    </button>
                    <div>
                      <p className="text-md font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>

                  <p className={`text-${item.pcColor}`}>{item.amount}</p>
                </div>
              ))}
              <div className="mt-4">
                <SparkLine
                  currentColor={currentColor}
                  id="area-sparkLine"
                  height="160px"
                  type="Area"
                  data={SparklineAreaData}
                  width="320"
                  color="rgb(242, 252, 253)"
                />
                <button>6</button>
              </div>
            </div>
          </div>
          <div
            className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3"
            style={{ border: "1px solid #DADADA" }}
          >
            <div className="flex justify-between">
              <p className="text-xl font-semibold">MedicalPro Branding</p>
              <button
                type="button"
                className="text-xl font-semibold text-gray-400"
              >
                <IoIosMore />
              </button>
            </div>
            <p className="text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-24 bg-orange-400 py-0.5 px-2 text-gray-200 mt-10">
              16 APR, 2021
            </p>

            <div className="flex gap-4 border-b-1 border-color mt-6">
              {medicalproBranding.data.map((item) => (
                <div
                  key={item.title}
                  className="border-r-1 border-color pr-4 pb-2"
                >
                  <p className="text-xs text-gray-400">{item.title}</p>
                  <p className="text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="border-b-1 border-color pb-4 mt-2">
              <p className="text-md font-semibold mb-2">Teams</p>

              <div className="flex gap-4">
                {medicalproBranding.teams.map((item) => (
                  <p
                    key={item.name}
                    style={{ background: item.color }}
                    className="cursor-pointer hover:drop-shadow-xl text-white py-0.5 px-3 rounded-lg text-xs"
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-2">
              <p className="text-md font-semibold mb-2">Leaders</p>
              <div className="flex gap-4">
                {medicalproBranding.leaders.map((item, index) => (
                  <img
                    key={index}
                    className="rounded-full w-8 h-8"
                    src={item.image}
                    alt=""
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mt-5 border-t-1 border-color">
              <div className="mt-3">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Add"
                  borderRadius="10px"
                />
              </div>

              <p className="text-gray-400 text-sm">36 Recent Transactions</p>
            </div>
          </div>
          <div
            className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3"
            style={{ border: "1px solid #DADADA" }}
          >
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Daily Activities</p>
              <button
                type="button"
                className="text-xl font-semibold text-gray-500"
              >
                <IoIosMore />
              </button>
            </div>
            <div className="mt-10">
              <img className="md:w-96 h-50 " src={product9} alt="" />
              <div className="mt-8">
                <p className="font-semibold text-lg">React 18 coming soon!</p>
                <p className="text-gray-400 ">By Johnathan Doe</p>
                <p className="mt-8 text-sm text-gray-400">
                  This will be the small description for the news you have shown
                  here. There could be some great info.
                </p>
                <div className="mt-3">
                  <Button
                    color="white"
                    bgColor={currentColor}
                    text="Read More"
                    borderRadius="10px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
