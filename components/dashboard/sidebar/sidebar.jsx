import SidebarItems from "../sidebar-items/Sidebaritems";

export default function Sidebar() {
  return (
    <aside className="bg-[#070F2B] w-64 h-screen p-4 sticky top-0"> 
      <div className="mb-8">
        <h2 className="text-lg font-bold text-white">L4IT ADMIN</h2>
      </div>
      <nav className="space-y-2">
        <SidebarItems />
      </nav>
    </aside>
  );
}

