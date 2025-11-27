module.exports = {
  safelist: [
    'bg-[var(--color-red-40)]',
    'bg-[var(--color-red-30)]',
    'bg-[var(--color-red-20)]',
    'text-[var(--color-red-40)]',
    'text-[var(--color-red-30)]',
    'text-[var(--color-red-20)]',
  ],
  theme: {
    extend: {
      screens: {
        mobile: { max: '375px' }, // 375px 이하
        tablet: { max: '744px' }, // 744px 이하
      },
    },
  },
  plugins: [],
};
