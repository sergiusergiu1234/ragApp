import { cn } from "@/lib/utils"
import { AlertCircle, RefreshCw } from "lucide-react"

interface ErrorProps {
  message?: string
  onRetry?: () => void
  className?: string
}

export function Error({ message = "Something went wrong", onRetry, className }: ErrorProps) {
  return (
    <div className={cn("flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg", className)}>
      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-red-700 font-medium">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-3 py-1 text-sm text-red-700 hover:text-red-800 hover:bg-red-100 rounded-md transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      )}
    </div>
  )
} 