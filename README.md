# AI Image Generation Concept

A Next.js application that demonstrates AI-powered image generation capabilities. Users can upload reference images and generate new AI-enhanced variations.

## Features

- Image upload functionality
- AI-powered image generation
- Next.js 14 App Router
- TypeScript support
- Modern UI components

## Installation

Make sure you have [Node.js](https://nodejs.org) and [pnpm](https://pnpm.io) installed, then run:

```bash
# Install dependencies
pnpm install
```

## Environment Setup

### Getting a Stability AI API Key

1. Visit [Stability AI Platform](https://platform.stability.ai)
2. Click "Sign Up" if you don't have an account, or "Log In" if you do
3. After logging in, go to your [Account Settings](https://platform.stability.ai/account)
4. In the API Keys section, click "Create API Key"
5. Copy your newly generated API key

### Setting Up Environment Variables

Create a `.env.local` file with the following environment variables:

```env
STABILITY_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with the API key you obtained from Stability AI.

## Development

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── generate/      # Image generation endpoint
│   ├── components/        # React components
│   └── page.tsx           # Main page
```

## Built With

- [Next.js](https://nextjs.org) - The React Framework
- [TypeScript](https://www.typescriptlang.org) - Type safety
- Modern development tools and best practices

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
