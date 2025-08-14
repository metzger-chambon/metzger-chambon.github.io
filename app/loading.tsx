export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-(--background) text-(--foreground) text-center px-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-(--foreground) border-opacity-50 mb-6" />
      <h1 className="text-xl font-semibold">Loading...</h1>
      <p className="text-sm mt-2 text-(--foreground) opacity-75">
        Please wait while we prepare the content.
      </p>
    </div>
  );
}
