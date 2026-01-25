import { Header } from "@/components/layouts/header";
import { Main } from "@/components/layouts/main";
import { ProfileDropdown } from "@/components/shared/profile-dropdown";
import { Search } from "@/components/shared/search";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";

import { DashboardStats } from "./components/dashboard-stats";

export function Dashboard() {
	return (
		<>
			<Header>
				<Search />
				<div className="ms-auto flex items-center gap-4">
					<ThemeToggle />
					<ProfileDropdown />
				</div>
			</Header>
			<Main>
				<div className="mb-2 flex items-center justify-between space-y-2">
					<h1 className="font-bold text-2xl tracking-tight">Dashboard</h1>
					<div className="flex items-center space-x-2">
						<Button>Download Report</Button>
					</div>
				</div>
				<div className="space-y-4">
					<DashboardStats />
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						{/* Placeholder for charts */}
						<div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow">
							<div className="p-6">
								<h3 className="font-semibold leading-none tracking-tight">
									Overview
								</h3>
								<p className="text-muted-foreground text-sm">
									Platform growth over time
								</p>
								<div className="mt-4 flex h-75 items-center justify-center rounded-md border-2 border-dashed">
									Chart Placeholder
								</div>
							</div>
						</div>
						<div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow">
							<div className="p-6">
								<h3 className="font-semibold leading-none tracking-tight">
									Recent Gyms
								</h3>
								<p className="text-muted-foreground text-sm">
									New gyms onboarded this month
								</p>
								<div className="mt-4 space-y-4">
									{/* Mock list */}
									{[1, 2, 3, 4, 5].map((i) => (
										<div className="flex items-center" key={i}>
											<div className="ml-4 space-y-1">
												<p className="font-medium text-sm leading-none">
													Gym {i}
												</p>
												<p className="text-muted-foreground text-sm">
													gym{i}@example.com
												</p>
											</div>
											<div className="ml-auto font-medium">+$1,999.00</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Main>
		</>
	);
}
