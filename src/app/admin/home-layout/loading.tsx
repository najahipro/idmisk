import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function HomeLayoutLoading() {
    return (
        <div className="space-y-6">
            <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />

            {/* Hero Section Skeleton */}
            <Card className="bg-white border-border shadow-sm">
                <CardHeader>
                    <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="h-10 bg-gray-100 rounded animate-pulse" />
                    <div className="h-10 bg-gray-100 rounded animate-pulse" />
                    <div className="h-10 bg-gray-100 rounded animate-pulse" />
                    <div className="h-48 bg-gray-100 rounded animate-pulse" />
                </CardContent>
            </Card>

            {/* Middle Section Skeleton */}
            <Card className="bg-white border-border shadow-sm">
                <CardHeader>
                    <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="h-10 bg-gray-100 rounded animate-pulse" />
                    <div className="h-10 bg-gray-100 rounded animate-pulse" />
                    <div className="h-48 bg-gray-100 rounded animate-pulse" />
                </CardContent>
            </Card>

            {/* Split Section Skeleton */}
            <Card className="bg-white border-border shadow-sm">
                <CardHeader>
                    <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div className="h-10 bg-gray-100 rounded animate-pulse" />
                            <div className="h-10 bg-gray-100 rounded animate-pulse" />
                            <div className="h-32 bg-gray-100 rounded animate-pulse" />
                        </div>
                        <div className="space-y-3">
                            <div className="h-10 bg-gray-100 rounded animate-pulse" />
                            <div className="h-10 bg-gray-100 rounded animate-pulse" />
                            <div className="h-32 bg-gray-100 rounded animate-pulse" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
