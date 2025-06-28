
const loader = () => {
  return (
        <>
     <div className="fixed inset-0 bg-[#121212] flex flex-col items-center justify-center text-center text-green-300 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-400 mb-6"></div>

      <h2 className="text-xl font-semibold tracking-wide">
        Preparing your quiz...
      </h2>
      <p className="text-sm mt-2 text-gray-400">
        Fetching questions and loading your game session
      </p>
    </div>
        
        </>
  )
}

export default loader