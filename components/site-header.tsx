import Link from "next/link"
import { Search } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold text-white">
            Forum
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/tags" className="text-sm text-white hover:text-blue-100">
              Tags
            </Link>
            <Link href="/users" className="text-sm text-white hover:text-blue-100">
              Users
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center space-x-4 px-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 bg-white/90"
            />
          </div>
          <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
            Register
          </Button>
          <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
            Login
          </Button>
        </div>
      </div>
    </header>
  )
}

