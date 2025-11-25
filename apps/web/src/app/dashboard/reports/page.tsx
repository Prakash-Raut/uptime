import { subHours, subMinutes } from "date-fns";

export const incidents = [
	{
		id: "INC-1234",
		title: "High Latency in US-East Region",
		status: "investigating",
		severity: "major",
		createdAt: subMinutes(new Date(), 45).toISOString(),
		updatedAt: subMinutes(new Date(), 10).toISOString(),
		services: ["API Gateway", "Database Cluster"],
		description:
			"We are observing elevated error rates and latency in the US-East region. Engineering team is investigating the root cause.",
	},
	{
		id: "INC-1233",
		title: "Payment Gateway Timeout",
		status: "resolved",
		severity: "critical",
		createdAt: subHours(new Date(), 5).toISOString(),
		updatedAt: subHours(new Date(), 4).toISOString(),
		services: ["Payment Service"],
		description:
			"Payment processing was unavailable for approximately 45 minutes due to an upstream provider outage.",
	},
	{
		id: "INC-1232",
		title: "Scheduled Maintenance: Database Upgrade",
		status: "completed",
		severity: "maintenance",
		createdAt: subHours(new Date(), 24).toISOString(),
		updatedAt: subHours(new Date(), 22).toISOString(),
		services: ["Database Cluster"],
		description:
			"Routine maintenance to upgrade database clusters to the latest security patch.",
	},
];

export default function Page() {
	return (
		<h1>Reports</h1>
		// <div className="space-y-8">
		// 	{/* Header */}
		// 	<div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
		// 		<div>
		// 			<h1 className="text-3xl font-bold tracking-tight">Incidents</h1>
		// 			<p className="text-muted-foreground mt-1">Track and resolve system issues</p>
		// 		</div>
		// 		{/* <CreateIncidentDialog /> */}
		// 	</div>

		// 	{/* Search Bar - Pill Style */}
		// 	<div className="soft-card p-2 flex items-center gap-2">
		// 		<Search className="h-5 w-5 text-gray-400 ml-4" />
		// 		<Input
		// 			placeholder="Search incidents..."
		// 			className="border-none shadow-none focus-visible:ring-0 bg-transparent h-10"
		// 		/>
		// 		<Button>Search</Button>
		// 	</div>

		// 	{/* Incident Cards */}
		// 	<div className="grid gap-4">
		// 		{incidents.map((incident) => (
		// 			<div key={incident.id} className="soft-card transition-all group">
		// 				<div className="flex flex-col sm:flex-row gap-6 items-start border p-6 rounded-xl">
		// 					{/* Status Icon Bubble */}
		// 					<div className={cn(
		// 						"h-14 w-14 rounded-[1.2rem] flex items-center justify-center shrink-0 transition-colors",
		// 						incident.status === 'resolved' ? "bg-[#D1E7E0] text-[#1A4D40]" :
		// 							incident.status === 'investigating' ? "bg-amber-100 text-amber-700" :
		// 								"bg-blue-50 text-blue-600"
		// 					)}>
		// 						{incident.status === 'resolved' ? <CheckCircle2 className="h-6 w-6" /> :
		// 							incident.status === 'investigating' ? <AlertTriangle className="h-6 w-6" /> :
		// 								<AlertCircle className="h-6 w-6" />}
		// 					</div>

		// 					<div className="flex-1 min-w-0">
		// 						<div className="flex items-start justify-between mb-2">
		// 							<div className="flex items-center gap-3">
		// 								<h3 className="text-lg font-bold truncate">{incident.title}</h3>
		// 								<Badge variant="outline" className="rounded-full border-gray-200 text-gray-500 font-normal capitalize">
		// 									{incident.status}
		// 								</Badge>
		// 							</div>
		// 							<Button variant="ghost" size="icon" className="rounded-full h-8 w-8 -mr-2 text-gray-400">
		// 								<MoreVertical className="h-4 w-4" />
		// 							</Button>
		// 						</div>

		// 						<p className="text-gray-500 text-sm mb-4 line-clamp-2">
		// 							{incident.description}
		// 						</p>

		// 						<div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
		// 							<span className="font-mono bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-600 font-medium">
		// 								{incident.id}
		// 							</span>
		// 							<div className="flex items-center gap-2">
		// 								<Clock className="h-4 w-4" />
		// 								{format(new Date(incident.createdAt), "MMM d, HH:mm")}
		// 							</div>
		// 							<div className="flex items-center gap-2">
		// 								<div className={cn("h-2 w-2 rounded-full",
		// 									incident.severity === 'critical' ? "bg-red-500" :
		// 										incident.severity === 'major' ? "bg-amber-500" : "bg-blue-500"
		// 								)} />
		// 								<span className="capitalize">{incident.severity} Severity</span>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		))}
		// 	</div>
		// </div>
	);
}
