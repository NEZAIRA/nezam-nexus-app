import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '../lib/rateLimiter';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are SupraBrain, a medical assistant developed by Nezaira.

Guidelines:
- Provide evidence-based medical information
- Support healthcare and learning
- Never provide direct medical diagnosis
- Recommend consulting healthcare professionals
- Keep responses clear, professional, and concise (1-3 sentences preferred)`;

export async function POST(request: Request) {
  try {
    // Rate limiting: Get client IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

    // Check rate limit (20 requests per minute per IP)
    const rateLimit = checkRateLimit(ip, 20, 60000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Please try again later.',
          resetTime: rateLimit.resetTime
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '20',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetTime.toString(),
          }
        }
      );
    }

    const { content, conversation_id } = await request.json();

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: content }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const answer = response.choices[0]?.message?.content || 'No response generated';

    return NextResponse.json({
      answer: answer.trim(),
      meta: {
        model: 'llama-3.3-70b-versatile',
        conversation_id: conversation_id || 'default',
        provider: 'groq',
      },
    }, {
      headers: {
        'X-RateLimit-Limit': '20',
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': rateLimit.resetTime.toString(),
      }
    });
  } catch (error: any) {
    console.error('Groq API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response', details: error.message },
      { status: 500 }
    );
  }
}
