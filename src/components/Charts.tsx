import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

// --- LINE CHART (Smooth Splines & Area Gradients) ---
interface LineChartProps {
  data: number[];
  labels: string[];
  height?: number;
  color?: string;
  gradientId?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  labels,
  height = 200,
  color = '#2563EB',
  gradientId = 'chart-grad-' + Math.random().toString(36).substring(2, 5)
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  const padding = 40;
  const chartHeight = height - padding * 2;
  
  const maxVal = Math.max(...data, 10) * 1.1; // 10% headroom
  const minVal = 0;
  
  // Calculate points
  const points = data.map((val, idx) => {
    const x = padding + (idx / (data.length - 1)) * (350 - padding * 2);
    const y = padding + chartHeight - ((val - minVal) / (maxVal - minVal)) * chartHeight;
    return { x, y, val };
  });

  // Create path (quadratic bezier splines)
  let pathD = '';
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const cpX = (curr.x + next.x) / 2;
      pathD += ` C ${cpX} ${curr.y}, ${cpX} ${next.y}, ${next.x} ${next.y}`;
    }
  }

  // Path for gradient area fill
  const areaD = points.length > 0 
    ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z` 
    : '';

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 350 ${height}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.45" />
            <stop offset="100%" stopColor={color} stopOpacity="0.00" />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
          const y = padding + ratio * chartHeight;
          const gridVal = Math.round(maxVal - ratio * (maxVal - minVal));
          return (
            <g key={idx}>
              <line 
                x1={padding} 
                y1={y} 
                x2={350 - padding} 
                y2={y} 
                className="stroke-slate-200 dark:stroke-slate-850" 
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text 
                x={padding - 10} 
                y={y + 4} 
                className="fill-slate-400 dark:fill-slate-500 text-[10px] text-right font-semibold"
                textAnchor="end"
              >
                {gridVal}
              </text>
            </g>
          );
        })}

        {/* Area Gradient */}
        {areaD && (
          <motion.path 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            d={areaD} 
            fill={`url(#${gradientId})`} 
          />
        )}

        {/* Smooth Line Path */}
        {pathD && (
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d={pathD} 
            fill="none" 
            stroke={color} 
            strokeWidth="3" 
            strokeLinecap="round" 
          />
        )}

        {/* Interactive dots */}
        {points.map((pt, idx) => (
          <g key={idx}>
            <circle
              cx={pt.x}
              cy={pt.y}
              r={hoveredIdx === idx ? 6 : 4}
              fill={color}
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-150 shadow-md"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            />
            {/* Axis labels */}
            {idx % 2 === 0 && (
              <text 
                x={pt.x} 
                y={height - padding + 18} 
                className="fill-slate-400 dark:fill-slate-500 text-[9px] font-bold"
                textAnchor="middle"
              >
                {labels[idx]}
              </text>
            )}
          </g>
        ))}
      </svg>
      {/* Dynamic HTML Tooltip */}
      {hoveredIdx !== null && (
        <div 
          className="absolute glass-panel p-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xl pointer-events-none text-xs font-bold animate-scale-in dark:text-white"
          style={{
            left: `${(points[hoveredIdx].x / 350) * 100}%`,
            top: `${(points[hoveredIdx].y / height) * 100 - 45}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="text-[10px] text-slate-400 font-semibold">{labels[hoveredIdx]}</div>
          <div className="text-slate-800 dark:text-white mt-0.5">{points[hoveredIdx].val.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
};


// --- BAR CHART (Rounded columns & Tooltips) ---
interface BarChartProps {
  data: number[];
  labels: string[];
  height?: number;
  color?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  labels,
  height = 200,
  color = '#06B6D4'
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const padding = 35;
  const chartHeight = height - padding * 2;
  const maxVal = Math.max(...data, 10) * 1.1;

  const barWidth = 18;
  const spacing = (350 - padding * 2) / data.length;

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 350 ${height}`} className="w-full h-auto overflow-visible">
        {/* Grid lines */}
        {[0, 0.5, 1].map((ratio, idx) => {
          const y = padding + ratio * chartHeight;
          const gridVal = Math.round(maxVal - ratio * maxVal);
          return (
            <g key={idx}>
              <line 
                x1={padding} 
                y1={y} 
                x2={350 - padding} 
                y2={y} 
                className="stroke-slate-200 dark:stroke-slate-850" 
                strokeDasharray="4 4"
              />
              <text 
                x={padding - 8} 
                y={y + 4} 
                className="fill-slate-400 dark:fill-slate-500 text-[10px] font-semibold"
                textAnchor="end"
              >
                {gridVal}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((val, idx) => {
          const x = padding + idx * spacing + (spacing - barWidth) / 2;
          const barHeight = (val / maxVal) * chartHeight;
          const y = padding + chartHeight - barHeight;

          return (
            <g key={idx}>
              {/* Interactive invisible full-height rect for easier hover */}
              <rect
                x={padding + idx * spacing}
                y={padding}
                width={spacing}
                height={chartHeight}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
              {/* Visual rounded bar */}
              <motion.rect
                initial={{ height: 0, y: y + barHeight }}
                animate={{ height: barHeight, y }}
                transition={{ duration: 0.8, delay: idx * 0.05, ease: "easeOut" }}
                x={x}
                width={barWidth}
                rx="6"
                fill={hoveredIdx === idx ? '#2563EB' : color}
                className="transition-colors duration-300 pointer-events-none"
              />
              {/* Label */}
              <text
                x={x + barWidth / 2}
                y={height - padding + 15}
                className="fill-slate-400 dark:fill-slate-500 text-[9px] font-bold"
                textAnchor="middle"
              >
                {labels[idx]}
              </text>
            </g>
          );
        })}
      </svg>
      {/* Tooltip */}
      {hoveredIdx !== null && (
        <div 
          className="absolute glass-panel p-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xl pointer-events-none text-xs font-bold animate-scale-in dark:text-white"
          style={{
            left: `${((padding + hoveredIdx * spacing + spacing/2) / 350) * 100}%`,
            top: `${( (padding + chartHeight - (data[hoveredIdx] / maxVal) * chartHeight) / height) * 100 - 45}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="text-[10px] text-slate-400 font-semibold">{labels[hoveredIdx]}</div>
          <div className="text-slate-800 dark:text-white mt-0.5">{data[hoveredIdx]}%</div>
        </div>
      )}
    </div>
  );
};


// --- ATTENDANCE HEATMAP (Calendar Grid Visualizer) ---
interface HeatmapProps {
  daysCount?: number;
}

export const AttendanceHeatmap: React.FC<HeatmapProps> = ({ daysCount = 28 }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Generate color weights (Present: green, Late: orange, Half Day: blue, Absent: red)
  const cellColors = [
    { bg: 'bg-success/80 border-success-light/20', label: '96% Present (Optimal)' },
    { bg: 'bg-success/95 border-success-light/30 shadow-md shadow-success/10', label: '100% Present (Excellent)' },
    { bg: 'bg-success/60 border-success/10', label: '92% Present (Good)' },
    { bg: 'bg-warning/70 border-warning-light/20', label: '84% Present (Late Entries Alert)' },
    { bg: 'bg-danger/80 border-danger-light/20', label: '62% Present (High Absenteeism)' },
    { bg: 'bg-purpleAccent/70 border-purpleAccent-light/20', label: '89% Present (Staff Leave Effect)' }
  ];

  // Deterministic weights
  const cells = Array.from({ length: daysCount }).map((_, idx) => {
    const colorIndex = (idx * 3 + 1) % cellColors.length;
    return {
      day: idx + 1,
      ...cellColors[colorIndex]
    };
  });

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="grid grid-cols-7 gap-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(w => (
          <div key={w} className="text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 select-none">
            {w}
          </div>
        ))}
        {cells.map((cell, idx) => (
          <div key={idx} className="relative aspect-square">
            <button
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`w-full h-full rounded-[6px] border ${cell.bg} transition-all duration-200 hover:scale-110 cursor-pointer focus:outline-none`}
            />
            {hoveredIdx === idx && (
              <div className="absolute z-30 bottom-[125%] left-1/2 transform -translate-x-1/2 glass-panel border border-slate-200 dark:border-slate-700 p-2 rounded-lg text-[10px] font-bold shadow-2xl whitespace-nowrap dark:text-white animate-scale-in">
                Day {cell.day}: {cell.label}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 items-center mt-1 text-[10px] font-bold text-slate-400 dark:text-slate-500">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-success" /> Optimal/Perfect</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-warning" /> Late Outliers</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-purpleAccent" /> Staff Leave Days</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-danger" /> Critical Absents</span>
      </div>
    </div>
  );
};
