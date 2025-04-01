'use client'

import {useState} from 'react'
import Image from 'next/image'

export default function ImageUploader({onImageGenerated}: {onImageGenerated?: (url: string) => void}) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [generatedImage, setGeneratedImage] = useState('')
	const [prompt, setPrompt] = useState('')

	const generateImage = async () => {
		try {
			setLoading(true)
			setError('')

			const response = await fetch('/api/generate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({prompt}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Failed to generate image')
			}

			setGeneratedImage(data.imageUrl)
			if (onImageGenerated) {
				onImageGenerated(data.imageUrl)
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to generate image')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='space-y-6'>
			<div className='max-w-xl mx-auto space-y-2'>
				<input type='text' value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='Add a prompt' className='w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white dark:placeholder-gray-400' />
				{prompt && <p className='text-sm text-gray-600 text-center italic'>Note: Prompt-based image editing will be implemented in a future update using a different AI model.</p>}
			</div>
			<div className='flex flex-wrap gap-4 justify-center'>
				<button onClick={generateImage} disabled={loading} className='px-6 py-3 rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-semibold shadow-md disabled:opacity-50' title={prompt ? 'Coming Soon: The current API does not support prompts. We will implement prompt-based image editing in a future update using a different AI model.' : undefined}>
					{loading ? 'Generating...' : 'Generate Random Variation'}
				</button>
			</div>

			{error && <p className='text-red-500 text-center'>{error}</p>}

			{loading && <div className='text-center text-gray-600'>Generating image...</div>}

			{generatedImage && (
				<div className='flex flex-col items-center gap-4'>
					<h3 className='text-lg font-semibold'>Generated image:</h3>
					<div className='relative w-full aspect-square max-w-xl border rounded-lg overflow-hidden shadow-lg'>
						<Image src={generatedImage} alt='Generated image' fill className='object-contain' />
					</div>
				</div>
			)}
		</div>
	)
}
