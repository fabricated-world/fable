import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

const defaultTheme =
	browser &&
	(localStorage.getItem('color-scheme') ??
		(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

export const theme = writable(defaultTheme ?? 'dark');

export function toggleTheme() {
	theme.update((currentTheme) => {
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('color-scheme', newTheme);
		localStorage.setItem('color-scheme', newTheme);
		return newTheme;
	});
}
export function setTheme(newTheme: Theme) {
	theme.set(newTheme);
}

// Get the computed color value of a CSS variable
export function getColor(variableName: string) {
	if (browser) {
		return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
	}
}
