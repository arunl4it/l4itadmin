"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { menuItems } from '@/app/lib/menu-items'
 
const SidebarItems = () => {
  const pathname = usePathname()

  return (
    <div className="space-y-1">
      {menuItems.map((item) => {
        // Check if current path is exactly /dashboard or starts with /dashboard/item.href
        const isActive = pathname === `/dashboard/${item.href}` || 
                        (pathname === '/dashboard' && item.href === '')
        
        return (
          <Link
            key={item.id}
            href={`/dashboard/${item.href}`}
            className={`
              flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
              ${isActive 
                ? 'bg-blue-500 text-white' 
                : 'text-white hover:bg-slate-400 hover:text-slate-500'
              }
            `}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </Link>
        )
      })}
    </div>
  )
}

export default SidebarItems