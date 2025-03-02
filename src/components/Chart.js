import React, { useState, useContext, useEffect } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
} from "recharts";
import Card from "./Card";
import { chartConfig } from "../constants/config";
import ChartFilter from "./ChartFilter";
import ThemeContext from "../context/ThemeContext";
import {
  convertDateToUnixTimeStamp,
  convertUnixTimeStampToDate,
  createDate,
} from "../helpers/date-helper";
import { fetchHistoricalData } from "../api/stock-api";
import StockContext from "../context/StockContext";

const Chart = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("1W");

  const { darkMode } = useContext(ThemeContext);

  const { stockSymbol } = useContext(StockContext);

  // const formatData = () => {
  //   return data.c.map((item, index) => {
  //     return {
  //       value: item.toFixed(2),
  //       date: convertUnixTimeStampToDate(data.t[index]),
  //     };
  //   });
  // };

  const formatData = (rawData) => {
    return Object.keys(rawData)
      .map((date) => ({
        date,
        value: parseFloat(rawData[date]["5 adjusted close"]).toFixed(2),
      }))
      .reverse();
  };

  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[filter];

      const endDate = new Date();
      const startDate = createDate(endDate - days, -weeks, -months, -years);

      const startTimeStampUnix = convertDateToUnixTimeStamp(startDate);
      const endTimeStampUnix = convertDateToUnixTimeStamp(endDate);

      return { startTimeStampUnix, endTimeStampUnix };
    };
    const updateChartData = async () => {
      try {
        const result = await fetchHistoricalData(stockSymbol);
        setData(formatData(result));
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };

    updateChartData();
  }, [stockSymbol]);

  console.log(data); //data is imported correctly

  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-40">
        {Object.keys(chartConfig).map((item) => {
          return (
            <li key={item}>
              <ChartFilter
                text={item}
                active={filter === item}
                onClick={() => setFilter(item)}
              />
            </li>
          );
        })}
      </ul>
      <ResponsiveContainer>
        {/*recharts component */}
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fillOpacity={1}
            strokeWidth={0.5}
            fill="url(#chartColor)"
          />
          <Tooltip
            contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
            itemStyle={darkMode ? { color: "#818cf8" } : null}
          />
          <XAxis dataKey={"date"} />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

{
  /** t = array of timestamps from mock */
}
{
  /** c = array of close prices from mock */
}
export default Chart;
