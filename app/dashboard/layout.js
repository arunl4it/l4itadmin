import Header from "@/components/dashboard/header/header";
import Sidebar from "@/components/dashboard/sidebar/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen flex bg-[#1E2952] overflow-hidden">  
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="rounded-lg border p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
