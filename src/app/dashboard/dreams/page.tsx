'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatRelativeTime, truncateText } from '@/lib/utils'
import { 
  Moon, 
  Plus, 
  Sparkles, 
  Calendar,
  Brain,
  Stars
} from 'lucide-react'

interface DreamEntry {
  id: string
  title: string
  content: string
  interpretation?: string
  createdAt: string
  updatedAt: string
}

export default function DreamsPage() {
  const [dreams, setDreams] = useState<DreamEntry[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [interpreting, setInterpreting] = useState(false)
  const [selectedDream, setSelectedDream] = useState<DreamEntry | null>(null)

  useEffect(() => {
    fetchDreams()
  }, [])

  const fetchDreams = async () => {
    try {
      const response = await fetch('/api/dreams')
      if (response.ok) {
        const data = await response.json()
        setDreams(data)
      }
    } catch (error) {
      console.error('Error fetching dreams:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/dreams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
        }),
      })

      if (response.ok) {
        const newDream = await response.json()
        setDreams([newDream, ...dreams])
        setNewTitle('')
        setNewContent('')
        setIsCreating(false)
      }
    } catch (error) {
      console.error('Error creating dream entry:', error)
    } finally {
      setLoading(false)
    }
  }

  const interpretDream = async (dream: DreamEntry) => {
    setInterpreting(true)
    setSelectedDream(dream)

    try {
      const response = await fetch('/api/dreams/interpret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dreamId: dream.id,
          content: dream.content,
        }),
      })

      if (response.ok) {
        const { interpretation } = await response.json()
        
        // Update the dream in the local state
        setDreams(dreams.map(d => 
          d.id === dream.id 
            ? { ...d, interpretation }
            : d
        ))
        
        setSelectedDream({ ...dream, interpretation })
      }
    } catch (error) {
      console.error('Error interpreting dream:', error)
    } finally {
      setInterpreting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Moon className="h-8 w-8 text-primary" />
            Dream Journal
          </h1>
          <p className="text-muted-foreground">
            Record your dreams and unlock the wisdom of your subconscious mind
          </p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Record Dream
        </Button>
      </div>

      {/* Create Dream Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>New Dream Entry</CardTitle>
            <CardDescription>
              Capture your dream while it's still vivid in your memory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Dream Title
                </label>
                <Input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Give your dream a memorable title..."
                  required
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-2">
                  Dream Description
                </label>
                <Textarea
                  id="content"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Describe your dream in as much detail as you can remember..."
                  className="min-h-[200px]"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Include emotions, colors, people, places, and any symbols you remember
                </p>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Dream'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false)
                    setNewTitle('')
                    setNewContent('')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Dream Interpretation */}
      {selectedDream?.interpretation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stars className="h-5 w-5 text-primary" />
              Dream Interpretation: "{selectedDream.title}"
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-sm text-muted-foreground">
                {selectedDream.interpretation}
              </div>
            </div>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSelectedDream(null)}
            >
              Close Interpretation
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Dreams List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Dreams</h2>
        {dreams.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Moon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Start Your Dream Journey</h3>
              <p className="text-muted-foreground mb-4">
                Record your first dream and discover what your subconscious is telling you
              </p>
              <Button onClick={() => setIsCreating(true)}>
                Record Your First Dream
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {dreams.map((dream) => (
              <Card key={dream.id} className="hover:bg-card/80 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Moon className="h-5 w-5 text-primary" />
                        {dream.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-4 w-4" />
                        {formatRelativeTime(new Date(dream.createdAt))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {dream.interpretation ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedDream(dream)}
                        >
                          <Stars className="h-4 w-4 mr-1" />
                          View Interpretation
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => interpretDream(dream)}
                          disabled={interpreting}
                        >
                          <Brain className="h-4 w-4 mr-1" />
                          {interpreting && selectedDream?.id === dream.id ? 'Interpreting...' : 'Interpret'}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {truncateText(dream.content, 200)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}