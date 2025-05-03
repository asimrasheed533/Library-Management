"use client";

import "@/style/dashboard.scss";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jun",
    uv: 4000,
    pv: 400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 398,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 200,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 908,
  },
  {
    name: "May",
    uv: 1890,
    pv: 700,
  },
  {
    name: "June",
    uv: 2390,
    pv: 800,
  },
  {
    name: "July",
    uv: 3490,
    pv: 100,
  },
  {
    name: "Aug",
    uv: 3490,
    pv: 600,
  },
  {
    name: "Sep",
    uv: 3490,
    pv: 100,
  },
  {
    name: "Oct",
    uv: 3490,
    pv: 700,
  },
  {
    name: "Nov",
    uv: 3490,
    pv: 300,
  },
  {
    name: "Dec",
    uv: 3490,
    pv: 400,
  },
];

export default function Admin() {
  return (
    <div className="admin__payment__chart">
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#00A76F" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
