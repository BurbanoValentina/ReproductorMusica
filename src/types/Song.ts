export interface Song {
	id: string;
	title: string;
	artist: string;
	duration: string;
	url: string;
}

export type AddPosition = 'start' | 'end';
