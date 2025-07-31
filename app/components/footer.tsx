export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-(--footerbg) text-(--foreground) py-8 border-t border-gray-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="mt-2 text-sm">
          {new Date().getFullYear()} | Metzger Chambon Lab website | Provided by{" "}
          <a href="https://github.com/vgilbart" className="underline">vgilbart</a> 🌻
        </p>
      </div>
    </footer>
  );
}
