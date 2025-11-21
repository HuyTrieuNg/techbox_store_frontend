'use client';

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LineChartProps {
    data: any[];
    xKey: string;
    yKey: string;
    color?: string;
    height?: number;
    yAxisLabel?: string;
    xAxisLabel?: string;
}

export function LineChart({
    data,
    xKey,
    yKey,
    color = '#3b82f6',
    height = 300,
    yAxisLabel,
    xAxisLabel
}: LineChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                    dataKey={xKey}
                    label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -5 } : undefined}
                    className="text-xs"
                />
                <YAxis
                    label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
                    className="text-xs"
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                    }}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey={yKey}
                    stroke={color}
                    strokeWidth={2}
                    dot={{ fill: color, r: 4 }}
                    activeDot={{ r: 6 }}
                />
            </RechartsLineChart>
        </ResponsiveContainer>
    );
}
