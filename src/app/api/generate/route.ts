import { NextRequest } from 'next/server';

const STABLE_DIFFUSION_API_KEY = process.env.STABLE_DIFFUSION_API_KEY;
const API_URL = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';

export async function POST(req: NextRequest) {
	try {
		const { prompt, apiKey } = await req.json();

		// Validate API key format
		const validateApiKey = (key: string) => {
			if (!key) return false;
			return /^sk-[a-zA-Z0-9]{48}$/.test(key);
		};

		// Use provided API key or fall back to environment variable
		const finalApiKey = apiKey || STABLE_DIFFUSION_API_KEY;

		if (!finalApiKey) {
			throw new Error('No Stability API key provided. Please either configure STABLE_DIFFUSION_API_KEY in environment variables or provide an API key in the input field.');
		}

		if (!validateApiKey(finalApiKey)) {
			throw new Error('Invalid API key format. Should start with "sk-" followed by 48 characters.');
		}

		const response = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${finalApiKey}`,
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
