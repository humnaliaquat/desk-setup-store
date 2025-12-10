export default function AdminNotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl">Oops! Admin page not found.</p>
      <a href="/admin" className="mt-4 text-orange-400 underline">
        Go back to Admin Dashboard
      </a>
    </div>
  );
}
