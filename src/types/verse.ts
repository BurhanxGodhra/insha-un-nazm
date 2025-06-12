export interface OpeningVerse {
  id: string;
  text: string;
  author: string;
  language: 'English' | 'French' | 'Arabic' | 'Lisan al-Dawah' | 'Urdu';
  date: string;
  day: number; // Day of the festival (1-10)
}