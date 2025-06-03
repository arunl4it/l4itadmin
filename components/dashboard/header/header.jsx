export default function Header() {
  return (
    <header className="bg-[#070F2B] shadow  h-16 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* User Profile Section */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
          <span className="text-sm text-black">User</span>
        </div>
      </div>
    </header>
  );
}
