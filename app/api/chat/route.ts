import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

const hf = new HfInference(process.env.HUGGINGFACE_API_TOKEN);

const SYSTEM_PROMPT = `You are SupraBrain, a medical research assistant developed by Nezaira.

Guidelines:
- Provide evidence-based medical information
- Support healthcare research and learning
- Never provide direct medical diagnosis
- Recommend consulting healthcare professionals
- Keep responses clear, professional, and concise (1-3 sentences preferred)`;

export async function POST(request: Request) {
  try {
    const { content, conversation_id } = await request.json();

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    const response = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: `${SYSTEM_PROMPT}\n\nUser: ${content}\n\nAssistant:`,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        top_p: 0.95,
        return_full_text: false,
      },
    });

    return NextResponse.json({
      answer: response.generated_text.trim(),
      meta: {
        model: 'mistralai/Mistral-7B-Instruct-v0.2',
        conversation_id: conversation_id || 'default',
        provider: 'huggingface',
      },
    });
  } catch (error: any) {
    console.error('HuggingFace API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response', details: error.message },
      { status: 500 }
    );
  }
}
