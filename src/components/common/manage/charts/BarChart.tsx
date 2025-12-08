'use client';

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarChartProps {
    data: any[];
    xKey: string;
    yKey: string;
    color?: string;
    height?: number;
    yAxisLabel?: string;
    xAxisLabel?: string;
}

export function BarChart({
    data,
    xKey,
    yKey,
    color = '#8b5cf6',
    height = 300,
    yAxisLabel,
    xAxisLabel
}: BarChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                <Bar
                    dataKey={yKey}
                    fill={color}
                    radius={[8, 8, 0, 0]}
                />
            </RechartsBarChart>
        </ResponsiveContainer>
    );
}
