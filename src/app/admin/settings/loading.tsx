import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SettingsLoading() {
    return (
        <div className="space-y-6">
            <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />

            {/* Categories Section Skeleton */}
            <Card className="bg-white border-border shadow-sm">
                <CardHeader>
                    <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="h-10 bg-gray-100 rounded animate-pulse" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-20 bg-gray-100 rounded animate-pulse" />
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Colors Section Skeleton */}
            <Card className="bg-white border-border shadow-sm">
                <CardHeader>
                    <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="h-10 bg-gray-100 rounded animate-pulse" />
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Sizes Section Skeleton */}
            <Card className="bg-white border-border shadow-sm">
                <CardHeader>
                    <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="h-10 bg-gray-100 rounded animate-pulse" />
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
