export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-sky-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
    >
      Skip to main content
    </a>
  );
}
