"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartConfig = {
	asia: {
		label: "Asia",
		color: "var(--chart-3)",
	},
} satisfies ChartConfig;

const dataDay = [
	{ time: "1 AM", asia: 1 },
	{ time: "4 AM", asia: 1 },
	{ time: "8 AM", asia: 0 },
	{ time: "12 PM", asia: 1 },
	{ time: "4 PM", asia: 1 },
	{ time: "8 PM", asia: 1 },
];

const dataWeek = [
	{ time: "Fri", asia: 1 },
	{ time: "Sat", asia: 1 },
	{ time: "Sun", asia: 0 },
	{ time: "Mon", asia: 1 },
	{ time: "Tue", asia: 1 },
	{ time: "Wed", asia: 1 },
	{ time: "Thu", asia: 1 },
];

const dataMonth = [
	{ time: "1 Nov", asia: 1 },
	{ time: "5 Nov", asia: 1 },
	{ time: "10 Nov", asia: 0 },
	{ time: "15 Nov", asia: 1 },
	{ time: "20 Nov", asia: 1 },
	{ time: "25 Nov", asia: 1 },
	{ time: "30 Nov", asia: 1 },
];

export function RegionStatusLineChart() {
	const [range, setRange] = useState<"day" | "week" | "month">("day");

	const chartData =
		range === "day" ? dataDay : range === "week" ? dataWeek : dataMonth;

	return (
		<Card className="py-4">
			<CardHeader>
				<CardTitle>Asia Uptime</CardTitle>
				<CardDescription>Track uptime reliability</CardDescription>
			</CardHeader>

			{/* RANGE SWITCH */}
			<div className="flex gap-2 px-6 pb-4">
				{["day", "week", "month"].map((r) => (
					<Button
						key={r}
						onClick={() => setRange(r as any)}
						variant={range === r ? "default" : "outline"}
					>
						{r}
					</Button>
				))}
			</div>

			<CardContent>
				<ChartContainer
					config={chartConfig} // 🔥 IMPORTANT FIX
					className="h-[250px] w-full"
				>
					<LineChart data={chartData} margin={{ left: 12, right: 12 }}>
						<CartesianGrid vertical={false} />

						<XAxis
							dataKey="time"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={16}
						/>

						<ChartTooltip content={<ChartTooltipContent nameKey="asia" />} />

						<Line
							type="monotone"
							dataKey="asia"
							stroke="var(--chart-3)"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
