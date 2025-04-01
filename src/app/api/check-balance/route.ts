import { NextRequest } from 'next/server';

const STABLE_DIFFUSION_API_KEY = process.env.STABLE_DIFFUSION_API_KEY;
const API_URL = 'https://api.stability.ai/v1/user/balance';

export async function POST(req: NextRequest) {
	try {
		const { apiKey } = await req.json();

		// Use provided API key or fall back to environment variable
		const finalApiKey = apiKey || STABLE_DIFFUSION_API_KEY;

		if (!finalApiKey) {
			throw new Error('No Stability API key provided');
		}

		const response = await fetch(API_URL, {
			headers: {
				Authorization: `Bearer ${finalApiKey}`,
			},
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(`Stability API error: ${error.message}`);
		}

		const data = await response.json();
		return Response.json({ credits: data.credits });

	} catch (error) {
		console.error('Error checking balance:', error);
		return Response.json(
			{ error: 'Failed to check balance' },
			{ status: 500 }
		);
	}
}
