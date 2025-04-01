const STABLE_DIFFUSION_API_KEY = process.env.STABLE_DIFFUSION_API_KEY;

export async function GET() {
	return Response.json({
		hasApiKey: !!STABLE_DIFFUSION_API_KEY
	});
}
