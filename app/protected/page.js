export default function Protected() {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Protected Route</h1>
      <p className="text-gray-600">
        This is a protected page that can only be accessed with a valid API key.
      </p>
    </div>
  );
} 