'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { AnkhIcon } from '@/components/ui/ankh-icon'
import {
  BookOpen,
  Moon,
  Mail,
  Compass,
  MessageSquare,
  Users,
  Music,
  Heart,
  Gem,
  Brain,
  User,
  CreditCard,
  Home,
  Sparkles
} from 'lucide-react'

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'Sacred Journal',
    href: '/dashboard/sacred-journal',
    icon: BookOpen,
  },
  {
    name: 'Dream Journal',
    href: '/dashboard/dreams',
    icon: Moon,
  },
  {
    name: 'Future Letters',
    href: '/dashboard/letters',
    icon: Mail,
  },
  {
    name: 'Soul Quest',
    href: '/dashboard/quest',
    icon: Sparkles,
  },
  {
    name: 'Therapy Companion',
    href: '/dashboard/therapy',
    icon: MessageSquare,
  },
  {
    name: 'Mirror Matches',
    href: '/dashboard/matches',
    icon: Users,
  },
  {
    name: 'Media Vault',
    href: '/dashboard/media',
    icon: Music,
  },
  {
    name: 'Mood Tracking',
    href: '/dashboard/mood',
    icon: Heart,
  },
  {
    name: 'Values Discovery',
    href: '/dashboard/values',
    icon: Compass,
  },
  {
    name: 'Archetypes',
    href: '/dashboard/archetypes',
    icon: Gem,
  },
  {
    name: 'Psychometric Profile',
    href: '/dashboard/profiling',
    icon: Brain,
  },
  {
    name: 'Billing',
    href: '/dashboard/billing',
    icon: CreditCard,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border">
      {/* Logo */}
      <div className="flex items-center space-x-2 p-6 border-b border-border">
        <AnkhIcon size={28} />
        <span className="text-xl font-bold gradient-text">Ankh.ai</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          © 2024 Ankh.ai
        </p>
      </div>
    </div>
  )
}