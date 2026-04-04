export interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export default function Loading({
  message = "Memuat...",
  fullScreen = true,
}: LoadingProps) {
  return (
    <div className={fullScreen ? "p-6" : ""}>
      <div
        className={`flex items-center justify-center ${
          fullScreen ? "h-screen" : "py-12"
        }`}
      >
        <div className="text-center space-y-4">
          {/* Spinner */}
          <div className="flex justify-center">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-zinc-700"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 border-r-emerald-500 animate-spin"></div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
