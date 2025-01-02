import React, { useState } from "react";
import { mockHistoricalData } from "../constants/mock";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
} from "recharts";
import { convertUnixTimeStampToDate } from "../helpers/date-helper";
import Card from "./Card";

const Chart = () => {
  const [data, setData] = useState(mockHistoricalData);
  const [filter, setFilter] = useState("1W");

  const formatData = () => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimeStampToDate(data.t[index]),
      };
    });
  };

  return (
    <Card>
      <ResponsiveContainer>
        <AreaChart data={formatData(data)}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="#rgb(199 210 254)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="#rgb(199 210 254)"
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
          <Tooltip />
          <XAxis dataKey={"date"} />
          <YAxis dataKey={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

/** t = array of timestamps from mock */
/** c = array of close prices from mock */
export default Chart;
