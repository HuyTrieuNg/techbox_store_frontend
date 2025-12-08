'use client';

import { BarChartIcon } from 'lucide-react';

interface EmptyChartStateProps {
    message?: string;
    height?: number;
}

export function EmptyChartState({
    message = 'No data available',
    height = 300
}: EmptyChartStateProps) {
    return (
        <div
            className="flex flex-col items-center justify-center text-muted-foreground"
            style={{ height: `${height}px` }}
        >
            <BarChartIcon className="h-12 w-12 mb-3 opacity-20" />
            <p className="text-sm">{message}</p>
        </div>
    );
}
