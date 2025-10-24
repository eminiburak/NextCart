export default function Card({ title, children, className = '' }) {
  return (
    <div
      className={`rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow-sm transition-colors ${className}`}
    >
      {title && (
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">{title}</h3>
      )}
      <div>{children}</div>
    </div>
  );
}
