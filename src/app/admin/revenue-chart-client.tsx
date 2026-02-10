"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/admin/overview"

interface GraphData {
    name: string
    total: number
}

interface RevenueChartClientProps {
    data: GraphData[]
}

export function RevenueChartClient({ data }: RevenueChartClientProps) {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Aperçu des Ventes</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <Overview data={data} />
            </CardContent>
        </Card>
    )
}
