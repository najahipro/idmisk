import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            {/* Responsive Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 bg-[#F9F5F0] overflow-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
