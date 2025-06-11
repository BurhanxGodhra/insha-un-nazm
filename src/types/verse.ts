export interface OpeningVerse {
  id: string;
  text: string;
  author: string;
  language: 'English' | 'Arabic' | 'Urdu';
  date: string;
  day: number; // Day of the festival (1-10)
}