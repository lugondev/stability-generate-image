import ImageUploader from './components/ImageUploader'

export default function Home() {
	return (
		<>
			<main className='flex min-h-screen flex-col items-center p-8 gap-8'>
				<div className='w-full max-w-4xl flex flex-col items-center gap-2'>
					<h1 className='text-3xl font-bold'>AI Image Generation</h1>
					<div className='flex items-center gap-4 text-sm text-gray-600'>
						<div className='flex items-center gap-2'>
							<a href='https://github.com/lugondev' className='hover:text-gray-900 transition-colors' target='_blank' rel='noopener noreferrer'>
								@lugondev
							</a>
							<span>/</span>
							<a href='https://github.com/lugondev/stability-generate-image' className='hover:text-gray-900 transition-colors' target='_blank' rel='noopener noreferrer'>
								stability-generate-image
							</a>
						</div>
						<span>•</span>
						<a href='mailto:lugondev@gmail.com' className='hover:text-gray-900 transition-colors'>
							lugondev@gmail.com
						</a>
					</div>
				</div>

				<section className='w-full max-w-4xl'>
					<details className='mb-8'>
						<summary className='text-xl font-semibold mb-4 cursor-pointer'>Getting Started (Click to expand)</summary>
						<div className='border rounded-lg p-6 bg-white shadow-sm space-y-4'>
							<div className='space-y-2'>
								<h3 className='font-bold text-gray-800'>Step 1: Get your API Key</h3>
								<ol className='list-decimal list-inside space-y-1 text-gray-700'>
									<li>
										Visit{' '}
										<a href='https://platform.stability.ai' className='text-blue-600 hover:underline' target='_blank' rel='noopener noreferrer'>
											Stability AI Platform
										</a>
									</li>
									<li>Sign up for an account or log in</li>
									<li>
										Go to your{' '}
										<a href='https://platform.stability.ai/account' className='text-blue-600 hover:underline' target='_blank' rel='noopener noreferrer'>
											Account Settings
										</a>
									</li>
									<li>Click &ldquo;Create API Key&rdquo; in the API Keys section</li>
									<li>Copy your new API key</li>
								</ol>
							</div>

							<div className='space-y-2'>
								<h3 className='font-bold text-gray-800'>Step 2: Use Your API Key</h3>
								<div className='space-y-4'>
									<p className='text-gray-700'>You have two options to use your API key:</p>

									<div className='pl-4 border-l-2 border-purple-200'>
										<h4 className='font-semibold mb-2 text-gray-600'>Option A: Backend Setup (Recommended)</h4>
										<ol className='list-decimal list-inside space-y-1 text-gray-700'>
											<li>
												Create a <code className='bg-gray-100 px-2 py-1 rounded'>.env.local</code> file in the project root
											</li>
											<li>
												Add your API key: <code className='bg-gray-100 px-2 py-1 rounded'>STABILITY_API_KEY=your_api_key_here</code>
											</li>
											<li>Restart the development server</li>
										</ol>
										<p className='text-sm text-gray-600 mt-1'>This method keeps your API key secure on the server side.</p>
									</div>

									<div className='pl-4 border-l-2 border-purple-200'>
										<h4 className='font-semibold mb-2 text-gray-600'>Option B: Client-side Input</h4>
										<ol className='list-decimal list-inside space-y-1 text-gray-700'>
											<li>Skip the backend setup</li>
											<li>Enter your API key directly in the input field below</li>
											<li>The key will be used only for your current session</li>
										</ol>
										<p className='text-sm text-gray-600 mt-1'>Use this method for quick testing or if you can&apos;t modify server files.</p>
									</div>
								</div>
							</div>
						</div>
					</details>
				</section>

				<section className='w-full max-w-4xl'>
					<h2 className='text-xl font-semibold mb-4'>Generate Image</h2>
					<div className='border rounded-lg p-6 bg-white shadow-sm'>
						<ImageUploader />
					</div>
				</section>
			</main>
		</>
	)
}
