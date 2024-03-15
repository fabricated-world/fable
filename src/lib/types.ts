import type { ComponentType } from 'svelte';
import type { Icon } from 'lucide-svelte';

export type Tags =
	| 'programming'
	| 'cybersecurity'
	| 'fabricated'
	| 'opensource'
	| 'network'
	| 'cryptography'
	| 'ctf'
	| 'pawn';

export type BlogPost = {
	slug: string;
	path: string;
	title: string;
	description: string;
	author: string;
	icon: string;
	date: string;
	published: boolean;
	tags: Tags[];
};

export type MenuItem = {
	name: string;
	path: string;
	icon?: ComponentType<Icon>;
};
