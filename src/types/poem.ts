export interface Author {
  id: string;
  name: string;
}

export interface Comment {
  id: string;
  text: string;
  author: Author;
  date: string;
}

export interface Poem {
  id: string;
  title: string;
  content: string;
  author: Author;
  language: 'English' | 'Arabic' | 'Urdu' | 'Lisan al-Dawah' | 'French';
  date: string;
  likes: number;
  comments: Comment[];
  views: number;
  approved: boolean;
  inspiredBy?: string; // ID of opening verse that inspired this poem
}