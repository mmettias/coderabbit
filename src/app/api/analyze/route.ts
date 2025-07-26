import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content, type = "journal" } = await request.json()

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      )
    }

    // For demo purposes, return a mock analysis if OpenAI key is not configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-demo-key') {
      const mockAnalysis = {
        insights: [
          "Your writing shows a strong sense of self-awareness and introspection.",
          "There are themes of growth and transformation present in your thoughts.",
          "You demonstrate resilience in facing challenges and seeking understanding."
        ],
        emotions: ["contemplative", "hopeful", "determined"],
        themes: ["self-discovery", "personal growth", "reflection"],
        suggestions: [
          "Consider exploring meditation practices to deepen your self-awareness.",
          "Journaling regularly can help you track patterns in your thoughts and emotions.",
          "Connect with others who share your journey of personal development."
        ]
      }
      
      return NextResponse.json(mockAnalysis)
    }

    const prompt = `Analyze the following ${type} entry and provide insights:

"${content}"

Please provide:
1. Key insights about the person's emotional state and mindset
2. Dominant emotions present
3. Main themes or patterns
4. Constructive suggestions for growth

Respond in JSON format with keys: insights (array), emotions (array), themes (array), suggestions (array).`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a compassionate AI therapist and life coach. Provide thoughtful, supportive analysis of personal writing. Be encouraging and focus on growth opportunities."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const analysis = completion.choices[0]?.message?.content
    
    if (!analysis) {
      throw new Error("No analysis generated")
    }

    try {
      const parsedAnalysis = JSON.parse(analysis)
      return NextResponse.json(parsedAnalysis)
    } catch (parseError) {
      // If JSON parsing fails, return a structured response
      return NextResponse.json({
        insights: [analysis],
        emotions: ["reflective"],
        themes: ["personal development"],
        suggestions: ["Continue your journey of self-discovery through regular journaling."]
      })
    }

  } catch (error) {
    console.error("Error analyzing content:", error)
    return NextResponse.json(
      { error: "Failed to analyze content" },
      { status: 500 }
    )
  }
}