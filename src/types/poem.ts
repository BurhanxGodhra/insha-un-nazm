export interface Author {
  id: string;
  name: string;
}

export interface Poem {
  id: string;
  type: 'individual' | 'full'; // Individual Abyat or Full Nazam
  content: string;
  author: Author;
  language: 'English' | 'Arabic' | 'Urdu';
  submissionMethod: 'upload' | 'recording' | 'manual';
  entryDate: string;
  rating: number; // 0-5 stars given by admin
  status: 'araz_done' | 'araz_pending'; // Araz status
  approved: boolean;
  inspiredBy?: string; // ID of opening verse that inspired this poem
  featured?: boolean; // Whether this poem is featured by admin
  fileName?: string; // For uploaded files
  audioFileName?: string; // For audio recordings
  arazContent?: string; // Final checked version by admin for araz
}