"use client";
import { logout } from "@/app/lib/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  async function handleLogout(formData) {
    const response = await logout();
    if (response?.redirect) {
      router.push(response.redirect);
    }
  }

  return (
    <header className="bg-[#070F2B] shadow h-16 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
              <span className="text-sm text-white">User</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-60 p-4 rounded-lg shadow-xl border border-gray-200">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mb-2">
                <span className="text-white text-xl font-medium">U</span>
              </div>

              <div className="text-center space-y-1">
                <h4 className="text-lg font-semibold text-gray-900">
                  L4IT Admin
                </h4>
                <p className="text-sm text-gray-500">admin@l4it.com</p>
              </div>

              <div className="w-full border-t border-gray-200 my-2"></div>

              <form action={handleLogout}>
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
