import { NextRequest } from 'next/server';

const STABLE_DIFFUSION_API_KEY = process.env.STABLE_DIFFUSION_API_KEY;
const API_URL = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';

export async function POST(req: NextRequest) {
	try {
		const { prompt } = await req.json();

		if (!STABLE_DIFFUSION_API_KEY) {
			throw new Error('STABLE_DIFFUSION_API_KEY is not configured');
		}

		const response = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${STABLE_DIFFUSION_API_KEY}`,
			},
			body: JSON.stringify({
				text_prompts: [{ text: prompt }],
				// cfg_scale: 7,
				height: 1024,
				width: 1024,
				// steps: 30,
				samples: 1,
			}),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(`Stability API error: ${error.message}`);
		}

		const responseData = await response.json();
		const imageUrl = responseData.artifacts[0].base64;

		return Response.json({
			imageUrl: `data:image/png;base64,${imageUrl}`
		});
	} catch (error) {
		console.error('Error generating image:', error);
		return Response.json(
			{ error: 'Failed to generate image' },
			{ status: 500 }
		);
	}
}
