import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
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

    const { dreamId, content } = await request.json()

    if (!dreamId || !content) {
      return NextResponse.json(
        { error: "Dream ID and content are required" },
        { status: 400 }
      )
    }

    // For demo purposes, return a mock interpretation if OpenAI key is not configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-demo-key') {
      const mockInterpretation = `This dream reflects your subconscious mind processing recent experiences and emotions. The symbols and themes present suggest:

• **Transformation**: Your psyche is working through changes in your life
• **Inner Wisdom**: Your unconscious is offering guidance for current challenges  
• **Emotional Processing**: Dreams help integrate daily experiences with deeper understanding
• **Symbolic Communication**: Your mind uses metaphors to communicate important insights

Consider keeping a dream journal to track recurring patterns and symbols. Pay attention to the emotions you felt during the dream, as they often provide the most meaningful insights.`
      
      // Update the dream entry with the interpretation
      await db.dreamEntry.update({
        where: { id: dreamId },
        data: { interpretation: mockInterpretation }
      })
      
      return NextResponse.json({ interpretation: mockInterpretation })
    }

    const prompt = `Analyze the following dream and provide a thoughtful interpretation:

"${content}"

Please provide:
1. Symbolic meanings of key elements
2. Possible psychological significance
3. Emotional themes present
4. Suggestions for reflection or action

Write in a compassionate, insightful tone that helps the dreamer understand their subconscious mind.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a wise dream interpreter with knowledge of Jungian psychology, symbolism, and the unconscious mind. Provide thoughtful, supportive interpretations that help people understand their inner world."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800,
    })

    const interpretation = completion.choices[0]?.message?.content
    
    if (!interpretation) {
      throw new Error("No interpretation generated")
    }

    // Update the dream entry with the interpretation
    await db.dreamEntry.update({
      where: { id: dreamId },
      data: { interpretation }
    })

    return NextResponse.json({ interpretation })

  } catch (error) {
    console.error("Error interpreting dream:", error)
    return NextResponse.json(
      { error: "Failed to interpret dream" },
      { status: 500 }
    )
  }
}