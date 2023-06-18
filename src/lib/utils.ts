import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// example usage
/**
 * import { cn } from "lib/utils"
 * 
 * <div className={cn("text-red-500", "bg-blue-500")}>
 *  Hello World
 * </div>
 * 
 * or
 * 
 * const isLoading = false
 * 
 * <div className={cn('bg-black' // unconditional, {
 * 'bg-white': isLoading // conditional
 * } )}
 */