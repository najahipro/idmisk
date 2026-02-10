import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AdminDashboardLoading() {
    return (
        <div className="space-y-6">
            <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />

            {/* Stats Cards Skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                            <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Chart and Table Skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Chart Skeleton */}
                <Card className="col-span-4">
                    <CardHeader>
                        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[350px] bg-gray-100 rounded animate-pulse" />
                    </CardContent>
                </Card>

                {/* Table Skeleton */}
                <Card className="col-span-3">
                    <CardHeader>
                        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
