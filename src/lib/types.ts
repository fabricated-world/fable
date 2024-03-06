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
