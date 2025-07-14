import { Link } from 'react-router-dom'

const notFound = () => {
  return (
    <>
<body className="bg-slate-950 text-white min-h-screen flex items-center justify-center p-6">

<div className="text-center max-w-lg">
  <h1 className="text-8xl font-extrabold text-green-500 mb-4">404</h1>
  <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
  <p className="text-slate-400 mb-6">
    Looks like you’ve taken a wrong turn on the quiz trail. This page doesn’t exist!
  </p>

  <div className="flex justify-center gap-4">
    <Link to="/categories" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition">
      Go Home
    </Link>
    
    <Link to="/settings" className="border border-green-500 text-green-400 hover:bg-green-700 hover:text-white px-6 py-3 rounded-lg font-semibold transition">
      Try a Quiz
    </Link>
  </div>

  <p className="text-slate-600 text-sm mt-6">Quiz App — Learn. Play. Master.</p>
</div>

</body>
    </>
  )
}

export default notFound