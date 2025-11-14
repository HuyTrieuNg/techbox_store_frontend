"use client";
import { motion } from "framer-motion";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4780 },
    { name: "May", sales: 5890 },
    { name: "Jun", sales: 6390 },
    { name: "Jul", sales: 7490 },
    { name: "Aug", sales: 8100 },
    { name: "Sep", sales: 6700 },
    { name: "Oct", sales: 7300 },
    { name: "Nov", sales: 8200 },
    { name: "Dec", sales: 9100 },
];
const SalesChart = () => {
    return (
        <motion.div
            className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            <h2 className="text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left">
                Sales Overview
            </h2>

            <div className="h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                        <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
                        <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} width={40} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', borderColor: '#4v5563', fontSize: "12px" }} itemStyle={{ color: '#e5e7eb' }} />
                        <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 2 }} />
                    </LineChart>
                </ResponsiveContainer>

            </div>
        </motion.div>


    );
};
export default SalesChart;