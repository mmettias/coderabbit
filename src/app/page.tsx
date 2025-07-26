import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnkhIcon } from '@/components/ui/ankh-icon'
import { 
  Brain, 
  Heart, 
  Sparkles, 
  Shield, 
  Crown,
  BookOpen,
  Moon,
  MessageSquare,
  Compass,
  Users
} from 'lucide-react'

const sacredStages = [
  {
    name: "Awakening",
    description: "Begin your journey of self-discovery",
    icon: Sparkles,
    color: "text-yellow-400"
  },
  {
    name: "Descent",
    description: "Explore the depths of your psyche",
    icon: Moon,
    color: "text-blue-400"
  },
  {
    name: "Purification",
    description: "Release what no longer serves you",
    icon: Shield,
    color: "text-green-400"
  },
  {
    name: "Integration",
    description: "Synthesize your insights and growth",
    icon: Brain,
    color: "text-purple-400"
  },
  {
    name: "Embodiment",
    description: "Live authentically from your truth",
    icon: Crown,
    color: "text-orange-400"
  }
]

const features = [
  {
    name: "Sacred Journal",
    description: "AI-powered insights from your deepest thoughts",
    icon: BookOpen
  },
  {
    name: "Dream Analysis",
    description: "Decode the messages from your subconscious",
    icon: Moon
  },
  {
    name: "Therapy Companion",
    description: "24/7 AI therapist for emotional support",
    icon: MessageSquare
  },
  {
    name: "Values Discovery",
    description: "Uncover your core values and purpose",
    icon: Compass
  },
  {
    name: "Mirror Matches",
    description: "Find your psychological twins in history",
    icon: Users
  },
  {
    name: "Emotional Intelligence",
    description: "Track and understand your emotional patterns",
    icon: Heart
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AnkhIcon size={32} />
            <span className="text-2xl font-bold gradient-text">Ankh.ai</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Decode Your{" "}
              <span className="gradient-text">Inner World</span>{" "}
              with AI
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Embark on a transformative journey of self-discovery through AI-powered 
              journaling, dream analysis, and psychological insights. Unlock the mysteries 
              of your psyche and heal from within.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Begin Your Journey
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Continue Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Stages */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Five Sacred Stages</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your healing journey follows an ancient path of transformation, 
              guided by AI wisdom and deep psychological insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {sacredStages.map((stage, index) => {
              const Icon = stage.icon
              return (
                <Card key={stage.name} className="text-center hover:bg-card/80 transition-colors">
                  <CardHeader>
                    <div className="mx-auto mb-4">
                      <Icon className={`w-12 h-12 ${stage.color}`} />
                    </div>
                    <CardTitle className="text-lg">{stage.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{stage.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">AI-Powered Self-Discovery</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools to understand your mind, emotions, and soul through 
              the lens of artificial intelligence and psychological science.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.name} className="hover:bg-card/80 transition-colors">
                  <CardHeader>
                    <Icon className="w-8 h-8 text-primary mb-2" />
                    <CardTitle>{feature.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/10">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Ready to Begin?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands who have transformed their lives through AI-guided self-discovery. 
              Your journey of healing and growth starts now.
            </p>
            <Link href="/auth/signup">
              <Button size="lg">
                Start Your Transformation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <AnkhIcon size={24} />
            <span className="text-lg font-semibold">Ankh.ai</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 Ankh.ai. Transforming lives through AI-powered self-discovery.
          </p>
        </div>
      </footer>
    </div>
  )
}