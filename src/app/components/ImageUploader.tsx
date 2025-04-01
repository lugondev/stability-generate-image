'use client'

import {useState, useEffect} from 'react'
import Image from 'next/image'

export default function ImageUploader({onImageGenerated}: {onImageGenerated?: (url: string) => void}) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [generatedImage, setGeneratedImage] = useState('')
	const [prompt, setPrompt] = useState('')
	const [apiKey, setApiKey] = useState('')
	const [showApiKey, setShowApiKey] = useState(false)
	const [apiKeyError, setApiKeyError] = useState('')
	const [hasBackendApiKey, setHasBackendApiKey] = useState(false)
	const [checkingApiKey, setCheckingApiKey] = useState(true)
	const [balance, setBalance] = useState<number | null>(null)
	const [checkingBalance, setCheckingBalance] = useState(false)

	const checkBalance = async (key?: string) => {
		setCheckingBalance(true)
		try {
			const response = await fetch('/api/check-balance', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({apiKey: key}),
			})
			const data = await response.json()
			if (response.ok) {
				setBalance(data.credits)
			}
		} catch (error) {
			console.error('Error checking balance:', error)
		} finally {
			setCheckingBalance(false)
		}
	}

	useEffect(() => {
		// Load stored API key from localStorage
		const storedApiKey = localStorage.getItem('stabilityApiKey')
		if (storedApiKey) {
			setApiKey(storedApiKey)
		}

		const checkApiKey = async () => {
			try {
				const response = await fetch('/api/check-api-key')
				const data = await response.json()
				setHasBackendApiKey(data.hasApiKey)
			} catch (error) {
				console.error('Error checking API key:', error)
			} finally {
				setCheckingApiKey(false)
			}
		}
		checkApiKey()

		// Check balance when API key changes
		if (apiKey || hasBackendApiKey) {
			checkBalance(apiKey)
		}
	}, [apiKey, hasBackendApiKey])

	const validateApiKey = (key: string) => {
		if (key && !/^sk-[a-zA-Z0-9]{48}$/.test(key)) {
			return 'Invalid API key format. Should start with "sk-" followed by 48 characters.'
		}
		return ''
	}

	const generateImage = async () => {
		setBalance(null) // Reset balance before generating
		try {
			setLoading(true)
			setError('')
			setApiKeyError('')

			if (!hasBackendApiKey && !apiKey) {
				setApiKeyError('API key is required as no backend key is configured')
				return
			}

			if (apiKey) {
				const keyError = validateApiKey(apiKey)
				if (keyError) {
					setApiKeyError(keyError)
					return
				}
			}

			const response = await fetch('/api/generate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({prompt, apiKey}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Failed to generate image')
			}

			setGeneratedImage(data.imageUrl)
			if (onImageGenerated) {
				onImageGenerated(data.imageUrl)
			}
			// Check updated balance after generation
			checkBalance(apiKey)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to generate image')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='space-y-6'>
			{(balance !== null || checkingBalance) && (
				<div className='text-center text-sm text-black font-bold'>
					<span className='text-dark-300'>Credits remaining: </span>
					{checkingBalance ? 'Checking...' : <span className={balance && balance < 1 ? 'text-red-500 dark:text-red-400' : ''}>{balance?.toFixed(4) || '0'}</span>}
				</div>
			)}
			<div className='max-w-xl mx-auto space-y-4'>
				<div className='relative'>
					<input
						type={showApiKey ? 'text' : 'password'}
						value={apiKey}
						onChange={(e) => {
							const newApiKey = e.target.value
							setApiKey(newApiKey)
							setApiKeyError('')
							// Store API key in localStorage when it's valid or empty
							const keyError = validateApiKey(newApiKey)
							if (!keyError) {
								if (newApiKey) {
									localStorage.setItem('stabilityApiKey', newApiKey)
								} else {
									localStorage.removeItem('stabilityApiKey')
								}
							}
						}}
						placeholder={`Stability API Key ${hasBackendApiKey ? '(optional)' : '(required)'}`}
						className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 ${apiKeyError ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
					/>
					{apiKeyError && <p className='text-red-500 text-sm mt-1'>{apiKeyError}</p>}
					<button onClick={() => setShowApiKey(!showApiKey)} className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700' type='button'>
						{showApiKey ? '🔒' : '👁️'}
					</button>
				</div>
				<input type='text' value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='Add a prompt' className='w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white dark:placeholder-gray-400' />
				{prompt && <p className='text-sm text-gray-600 text-center italic'>Note: Prompt-based image editing will be implemented in a future update using a different AI model.</p>}
			</div>
			<div className='flex flex-wrap gap-4 justify-center'>
				<button onClick={generateImage} disabled={loading || checkingApiKey || (!hasBackendApiKey && !apiKey)} className='px-6 py-3 rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-semibold shadow-md disabled:opacity-50' title={prompt ? 'Coming Soon: The current API does not support prompts. We will implement prompt-based image editing in a future update using a different AI model.' : undefined}>
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
