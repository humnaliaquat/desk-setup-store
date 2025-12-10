export default function UserNotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-black">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl">Page not found.</p>
      <a href="/" className="mt-4 text-orange-400 underline">
        Go back to Home user
      </a>
    </div>
  );
}
