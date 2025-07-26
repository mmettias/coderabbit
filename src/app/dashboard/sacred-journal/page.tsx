'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatRelativeTime, truncateText } from '@/lib/utils'
import { 
  BookOpen, 
  Plus, 
  Sparkles, 
  Calendar,
  Eye,
  Brain
} from 'lucide-react'

interface JournalEntry {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

interface Analysis {
  insights: string[]
  emotions: string[]
  themes: string[]
  suggestions: string[]
}

export default function SacredJournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/sacred-journal')
      if (response.ok) {
        const data = await response.json()
        setEntries(data)
      }
    } catch (error) {
      console.error('Error fetching entries:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/sacred-journal', {
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
        const newEntry = await response.json()
        setEntries([newEntry, ...entries])
        setNewTitle('')
        setNewContent('')
        setIsCreating(false)
      }
    } catch (error) {
      console.error('Error creating entry:', error)
    } finally {
      setLoading(false)
    }
  }

  const analyzeEntry = async (entry: JournalEntry) => {
    setAnalyzing(true)
    setSelectedEntry(entry)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: entry.content,
          type: 'journal',
        }),
      })

      if (response.ok) {
        const analysisData = await response.json()
        setAnalysis(analysisData)
      }
    } catch (error) {
      console.error('Error analyzing entry:', error)
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            Sacred Journal
          </h1>
          <p className="text-muted-foreground">
            Explore your inner world through mindful writing and AI insights
          </p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Entry
        </Button>
      </div>

      {/* Create Entry Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>New Journal Entry</CardTitle>
            <CardDescription>
              Write your thoughts and receive AI-powered insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Title
                </label>
                <Input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="What's on your mind today?"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-2">
                  Content
                </label>
                <Textarea
                  id="content"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Pour your thoughts onto the page..."
                  className="min-h-[200px]"
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Entry'}
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

      {/* Analysis Results */}
      {analysis && selectedEntry && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Insights for "{selectedEntry.title}"
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Key Insights</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {analysis.insights.map((insight, index) => (
                  <li key={index} className="text-muted-foreground">{insight}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Emotions Detected</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.emotions.map((emotion, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                  >
                    {emotion}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Themes</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.themes.map((theme, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Suggestions for Growth</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-muted-foreground">{suggestion}</li>
                ))}
              </ul>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setAnalysis(null)
                setSelectedEntry(null)
              }}
            >
              Close Analysis
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Entries List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Entries</h2>
        {entries.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Start Your Journey</h3>
              <p className="text-muted-foreground mb-4">
                Begin your self-discovery by writing your first journal entry
              </p>
              <Button onClick={() => setIsCreating(true)}>
                Write Your First Entry
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {entries.map((entry) => (
              <Card key={entry.id} className="hover:bg-card/80 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{entry.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-4 w-4" />
                        {formatRelativeTime(new Date(entry.createdAt))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => analyzeEntry(entry)}
                        disabled={analyzing}
                      >
                        <Brain className="h-4 w-4 mr-1" />
                        {analyzing && selectedEntry?.id === entry.id ? 'Analyzing...' : 'Analyze'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {truncateText(entry.content, 200)}
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