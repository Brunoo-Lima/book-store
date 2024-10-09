import { tv } from 'tailwind-variants';

export const button = tv({
  base: 'font-medium text-sm text-center text-white rounded-lg transition duration-300 border-transparent h-10 w-52 py-2.5 px-2',
  variants: {
    color: {
      primary: 'bg-blue-700 hover:bg-blue-800',
      secondary: 'bg-green-500',
      empty: 'text-blue-700 bg-white',
      addFields: 'bg-blue-500 hover:bg-blue-700',
      success: 'bg-green-700',
    },

    size: {
      default: 'h-10',
      sm: 'h-10 w-52 rounded-md',
      xs: 'h-10 w-24',
    },
  },

  defaultVariants: {
    size: 'default',
    color: 'primary',
  },
});
