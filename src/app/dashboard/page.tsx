'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
  Sparkles,
  Plus,
  ArrowRight
} from 'lucide-react'

const features = [
  {
    name: 'Sacred Journal',
    description: 'Write and reflect with AI-powered insights',
    icon: BookOpen,
    href: '/dashboard/sacred-journal',
    color: 'text-blue-400',
  },
  {
    name: 'Dream Journal',
    description: 'Record dreams and get AI interpretations',
    icon: Moon,
    href: '/dashboard/dreams',
    color: 'text-purple-400',
  },
  {
    name: 'Future Letters',
    description: 'Write to your future self',
    icon: Mail,
    href: '/dashboard/letters',
    color: 'text-green-400',
  },
  {
    name: 'Soul Quest',
    description: 'Personalized growth challenges',
    icon: Sparkles,
    href: '/dashboard/quest',
    color: 'text-yellow-400',
  },
  {
    name: 'Therapy Companion',
    description: '24/7 AI emotional support',
    icon: MessageSquare,
    href: '/dashboard/therapy',
    color: 'text-pink-400',
  },
  {
    name: 'Mirror Matches',
    description: 'Find your historical psychological twins',
    icon: Users,
    href: '/dashboard/matches',
    color: 'text-orange-400',
  },
  {
    name: 'Media Vault',
    description: 'Curated books, music, and podcasts',
    icon: Music,
    href: '/dashboard/media',
    color: 'text-red-400',
  },
  {
    name: 'Mood Tracking',
    description: 'Monitor your emotional patterns',
    icon: Heart,
    href: '/dashboard/mood',
    color: 'text-rose-400',
  },
  {
    name: 'Values Discovery',
    description: 'Uncover your core values',
    icon: Compass,
    href: '/dashboard/values',
    color: 'text-teal-400',
  },
  {
    name: 'Archetypes',
    description: 'Explore your psychological archetypes',
    icon: Gem,
    href: '/dashboard/archetypes',
    color: 'text-indigo-400',
  },
  {
    name: 'Psychometric Profile',
    description: 'Comprehensive personality analysis',
    icon: Brain,
    href: '/dashboard/profiling',
    color: 'text-cyan-400',
  },
]

const quickActions = [
  {
    name: 'Write Journal Entry',
    href: '/dashboard/sacred-journal',
    icon: Plus,
  },
  {
    name: 'Record Dream',
    href: '/dashboard/dreams',
    icon: Moon,
  },
  {
    name: 'Chat with Therapist',
    href: '/dashboard/therapy',
    icon: MessageSquare,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Link key={action.name} href={action.href}>
              <Button className="flex items-center space-x-2">
                <Icon className="h-4 w-4" />
                <span>{action.name}</span>
              </Button>
            </Link>
          )
        })}
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Explore Your Inner World</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link key={feature.name} href={feature.href}>
                <Card className="hover:bg-card/80 transition-colors cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Icon className={`h-8 w-8 ${feature.color}`} />
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <CardTitle className="text-lg">{feature.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <Card>
          <CardHeader>
            <CardTitle>Your Journey So Far</CardTitle>
            <CardDescription>
              Start exploring the tools above to begin your self-discovery journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-muted-foreground mb-4">
                <Sparkles className="h-12 w-12 mx-auto mb-2" />
                <p>Your transformation begins with a single step</p>
              </div>
              <Link href="/dashboard/sacred-journal">
                <Button>Write Your First Journal Entry</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}