import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProductsLoading() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Products Table Skeleton */}
            <Card className="bg-white border-border shadow-sm">
                <CardHeader>
                    <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {/* Table Header */}
                        <div className="grid grid-cols-6 gap-4 pb-3 border-b">
                            <div className="h-6 bg-gray-200 rounded animate-pulse" />
                            <div className="h-6 bg-gray-200 rounded animate-pulse" />
                            <div className="h-6 bg-gray-200 rounded animate-pulse" />
                            <div className="h-6 bg-gray-200 rounded animate-pulse" />
                            <div className="h-6 bg-gray-200 rounded animate-pulse" />
                            <div className="h-6 bg-gray-200 rounded animate-pulse" />
                        </div>
                        {/* Table Rows */}
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="grid grid-cols-6 gap-4 py-3">
                                <div className="h-8 bg-gray-100 rounded animate-pulse" />
                                <div className="h-8 bg-gray-100 rounded animate-pulse" />
                                <div className="h-8 bg-gray-100 rounded animate-pulse" />
                                <div className="h-8 bg-gray-100 rounded animate-pulse" />
                                <div className="h-8 bg-gray-100 rounded animate-pulse" />
                                <div className="h-8 bg-gray-100 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
