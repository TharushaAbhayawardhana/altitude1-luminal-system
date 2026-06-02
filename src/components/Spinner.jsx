export default function Spinner({ size = 'md' }) {
  const sizes = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12' }

  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={`${sizes[size]} rounded-full border-2 border-border border-t-primary animate-spin`}
      />
    </div>
  )
}
