"use client";

import { MetricCard } from "@/components/general/metric-card";
import {
	useMonitor,
	useMonitorStatus,
} from "@/features/monitors/hooks/use-monitor";
import { covertTimeFormat } from "@/lib/utils";
import { format, subHours } from "date-fns";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { PageHeader } from "./page-header";

type Props = {
	id: string;
};

export const MetricsData = (points = 24) => {
	return Array.from({ length: points }).map((_, i) => ({
		time: format(subHours(new Date(), points - i - 1), "HH:mm"),
		cpu: Math.floor(Math.random() * 40) + 20,
		memory: Math.floor(Math.random() * 30) + 40,
		requests: Math.floor(Math.random() * 1000) + 500,
		latency: Math.floor(Math.random() * 50) + 20,
	}));
};

export function MonitorView({ id }: Props) {
	const { data } = useMonitor(id);
	const { data: statusData } = useMonitorStatus(id);

	if (!data) return null;
	if (!statusData) return null;

	return (
		<div className="container mx-auto space-y-6 pt-6 pb-12">
			<PageHeader
				id={id}
				url={data.url}
				timeAdded={data.createdAt}
				status={statusData.currentStatus as "UP" | "DOWN" | "UNKNOWN"}
			/>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<MetricCard
					title="Uptime"
					value={covertTimeFormat(statusData.currentlyUpSince)}
				/>
				<MetricCard
					title="Last Checked At"
					value={covertTimeFormat(statusData.lastCheckedAt)}
				/>
				<MetricCard title="Incidents" value={statusData.incidents} />
			</div>

			{/* <RegionStatusLineChart /> */}

			<div className="soft-card p-8">
				<div className="flex justify-between items-center mb-8">
					<h3 className="text-xl font-bold">Performance History</h3>
					<div className="flex gap-2">
						<div className="flex items-center gap-2 text-sm text-gray-500">
							<div className="w-3 h-3 rounded-full bg-black" /> CPU
						</div>
						<div className="flex items-center gap-2 text-sm text-gray-500 ml-4">
							<div className="w-3 h-3 rounded-full bg-[#D1E7E0]" /> Memory
						</div>
					</div>
				</div>

				<div className="h-[400px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={MetricsData(24)}>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="#f0f0f0"
								vertical={false}
							/>
							<XAxis
								dataKey="time"
								stroke="#9CA3AF"
								fontSize={12}
								tickLine={false}
								axisLine={false}
								dy={10}
							/>
							<YAxis
								stroke="#9CA3AF"
								fontSize={12}
								tickLine={false}
								axisLine={false}
							/>
							<Tooltip
								contentStyle={{
									borderRadius: "16px",
									border: "none",
									boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
								}}
							/>
							<Line
								type="monotone"
								dataKey="cpu"
								stroke="#000000"
								strokeWidth={4}
								dot={false}
								activeDot={{
									r: 8,
									strokeWidth: 4,
									stroke: "#fff",
									fill: "#000",
								}}
							/>
							<Line
								type="monotone"
								dataKey="memory"
								stroke="#D1E7E0"
								strokeWidth={4}
								dot={false}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}
