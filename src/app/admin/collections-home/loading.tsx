import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function CollectionsHomeLoading() {
    return (
        <div className="space-y-6">
            <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />

            {/* Collections Grid Skeleton */}
            <Card className="bg-white border-border shadow-sm">
                <CardHeader>
                    <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-3">
                                <div className="h-48 bg-gray-100 rounded animate-pulse" />
                                <div className="h-6 bg-gray-100 rounded animate-pulse" />
                                <div className="h-6 bg-gray-100 rounded animate-pulse w-3/4" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
