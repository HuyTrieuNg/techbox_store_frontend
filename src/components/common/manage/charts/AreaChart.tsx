'use client';

import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AreaChartProps {
    data: any[];
    xKey: string;
    yKey: string;
    color?: string;
    height?: number;
    yAxisLabel?: string;
    xAxisLabel?: string;
}

export function AreaChart({
    data,
    xKey,
    yKey,
    color = '#10b981',
    height = 300,
    yAxisLabel,
    xAxisLabel
}: AreaChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsAreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <defs>
                    <linearGradient id={`color${yKey}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                    </linearGradient>
                </defs>
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
                <Area
                    type="monotone"
                    dataKey={yKey}
                    stroke={color}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill={`url(#color${yKey})`}
                />
            </RechartsAreaChart>
        </ResponsiveContainer>
    );
}
