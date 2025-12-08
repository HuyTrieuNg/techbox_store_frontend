'use client';

import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PieChartProps {
    data: any[];
    nameKey: string;
    valueKey: string;
    colors?: string[];
    height?: number;
    innerRadius?: number; // For donut chart
}

const DEFAULT_COLORS = [
    '#3b82f6', // blue
    '#8b5cf6', // purple
    '#10b981', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#06b6d4', // cyan
    '#ec4899', // pink
    '#14b8a6', // teal
];

export function PieChart({
    data,
    nameKey,
    valueKey,
    colors = DEFAULT_COLORS,
    height = 300,
    innerRadius = 0
}: PieChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsPieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    innerRadius={innerRadius}
                    fill="#8884d8"
                    dataKey={valueKey}
                    nameKey={nameKey}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                    }}
                />
                <Legend />
            </RechartsPieChart>
        </ResponsiveContainer>
    );
}
