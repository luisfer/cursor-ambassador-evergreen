/** FOUC-prevention snippet — keep in sync with `lib/theme.tsx` storage key + resolve rules. */
export const THEME_STORAGE_KEY = 'cursor-theme';

export const THEME_BOOT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var p=localStorage.getItem(k)||'system';var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=p==='dark'||(p!=='light'&&d)?'dark':'light';document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){}})();`;
