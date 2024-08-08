import { twMerge } from 'tailwind-merge';
// Code modified from
// https://chat.openai.com/share/58feb08e-0905-4860-a309-6d75687c2e6e
const clsx = (...args) => args.filter(arg => arg && typeof arg === 'string').join(' ');
export const cn = (...classes) => twMerge(clsx(...classes));
//# sourceMappingURL=utils.js.map
