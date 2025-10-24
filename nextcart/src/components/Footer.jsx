export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 text-center text-sm py-4 text-gray-600 dark:text-gray-400 transition-colors duration-300">
      © {new Date().getFullYear()} NextCart. All rights reserved.
    </footer>
  );
}
