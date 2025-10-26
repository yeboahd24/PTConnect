// Simplified cn utility - install clsx and tailwind-merge for full functionality
// Run: npm install clsx tailwind-merge

export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(' ');
}

// Once clsx and tailwind-merge are installed, replace with:
// import { type ClassValue, clsx } from 'clsx';
// import { twMerge } from 'tailwind-merge';
// 
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }