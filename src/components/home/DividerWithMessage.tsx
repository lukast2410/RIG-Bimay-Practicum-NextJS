export default function DividerWithMessage({ message, bg, size, mt, color }) {
	return (
		<div className={`relative sm:${mt}`}>
			<div className='absolute inset-0 flex items-center' aria-hidden='true'>
				<div className={`w-full border-t border-${color}`} />
			</div>
			<div className='relative flex justify-center'>
				<span className={`px-2 text-${size} bg-${bg} text-${color} font-medium`}>{message}</span>
			</div>
		</div>
	)
}
