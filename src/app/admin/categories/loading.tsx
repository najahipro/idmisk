import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function CategoriesLoading() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Categories Grid Skeleton */}
            <Card className="bg-white border-border shadow-sm">
                <CardHeader>
                    <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="space-y-3 p-4 border rounded">
                                <div className="h-32 bg-gray-100 rounded animate-pulse" />
                                <div className="h-6 bg-gray-100 rounded animate-pulse" />
                                <div className="h-6 bg-gray-100 rounded animate-pulse w-2/3" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
