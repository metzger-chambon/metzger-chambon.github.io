export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-(--background) text-(--foreground) text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">Sorry, the page you’re looking for doesn’t exist.</p>
      <a
        href="/"
        className="text-sm font-medium underline transition"
      >
        ← Go back home
      </a>
    </div>
  );
}
