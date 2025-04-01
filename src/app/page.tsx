import ImageUploader from './components/ImageUploader'

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center p-8 gap-8'>
			<h1 className='text-3xl font-bold'>AI Image Generation</h1>

			<section className='w-full max-w-4xl'>
				<h2 className='text-xl font-semibold mb-4'>Generate Image</h2>
				<div className='border rounded-lg p-6 bg-white shadow-sm'>
					<ImageUploader />
				</div>
			</section>
		</main>
	)
}
