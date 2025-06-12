import { Poem } from '../types/poem';
import { OpeningVerse } from '../types/verse';
import { Poet } from '../types/poet';

// Mock poems data with new structure
export const mockPoems: Poem[] = [
  {
    id: '1',
    type: 'full',
    content: `The morning light breaks through the clouds,
A symphony of colors, bold and proud.
Birds sing their chorus, nature's sweet sound,
As dew-kissed grass sparkles across the ground.

The world awakens to a brand new day,
As shadows of night gently fade away.
In this moment of peace, so pure and bright,
I find my solace in the morning light.`,
    author: { id: '2', name: 'Regular User' },
    language: 'English',
    submissionMethod: 'manual',
    entryDate: '2025-04-01T08:30:00Z',
    rating: 4.5,
    status: 'araz_done',
    approved: true,
    featured: true,
    arazContent: `The morning light breaks through the clouds,
A symphony of colors, bold and proud.
Birds sing their chorus, nature's sweet sound,
As dew-kissed grass sparkles across the ground.

The world awakens to a brand new day,
As shadows of night gently fade away.
In this moment of peace, so pure and bright,
I find my solace in the morning light.

[Admin Note: Minor corrections made for meter consistency]`,
  },
  {
    id: '2',
    type: 'full',
    content: `في صمت الليل أجد نفسي
وحيداً مع أفكاري التي لا تنام
النجوم تتلألأ في السماء البعيدة
كأنها تهمس لي أسرار الكون

القمر ينير دربي في الظلام
يرسم ظلالاً ترقص على الجدران
وأنا أستمع إلى نبضات قلبي
تخبرني قصصاً لم أسمعها من قبل`,
    author: { id: '2', name: 'Regular User' },
    language: 'Arabic',
    submissionMethod: 'manual',
    entryDate: '2025-04-02T19:45:00Z',
    rating: 4.2,
    status: 'araz_pending',
    approved: true,
  },
  {
    id: '3',
    type: 'individual',
    content: `شام کی روشنی میں ڈوبا ہوا منظر
جھیل کے پانی پر ناچتی ہوئی کرنیں`,
    author: { id: '2', name: 'Regular User' },
    language: 'Urdu',
    submissionMethod: 'recording',
    entryDate: '2025-04-03T18:20:00Z',
    rating: 3.8,
    status: 'araz_done',
    approved: true,
    audioFileName: 'urdu_abyat_recording.mp3',
    arazContent: `شام کی روشنی میں ڈوبا ہوا منظر
جھیل کے پانی پر ناچتی ہوئی کرنیں

[Admin Note: Pronunciation guide added for proper recitation]`,
  },
  {
    id: '4',
    type: 'full',
    content: `Steel and glass reach for the sky,
Where dreams and ambitions amplify.
The rhythm of footsteps, a steady beat,
Echoing stories on every street.

Car horns and whispers blend in the air,
A cacophony of lives and souls laid bare.
This concrete jungle, this human maze,
Captures my heart in countless ways.`,
    author: { id: '2', name: 'Regular User' },
    language: 'English',
    submissionMethod: 'upload',
    entryDate: '2025-04-04T14:10:00Z',
    rating: 0, // Not rated yet
    status: 'araz_pending',
    approved: false,
    fileName: 'urban_symphony.txt',
  },
  {
    id: '5',
    type: 'individual',
    content: `In the realm of ones and zeros,
We build worlds beyond imagination.`,
    author: { id: '2', name: 'Regular User' },
    language: 'English',
    submissionMethod: 'manual',
    entryDate: '2025-04-05T09:50:00Z',
    rating: 4.0,
    status: 'araz_done',
    approved: false,
    arazContent: `In the realm of ones and zeros,
We build worlds beyond imagination.

[Admin Note: Excellent metaphor for digital creativity]`,
  },
];

// Mock opening verses data
export const mockOpeningVerses: OpeningVerse[] = [
  {
    id: 'ov1',
    text: 'Time is but a river flowing in dreams',
    author: 'Henry David Thoreau',
    language: 'English',
    date: '2025-04-01T00:00:00Z',
    day: 1,
  },
  {
    id: 'ov2',
    text: 'الوقت كنهر يتدفق في الأحلام',
    author: 'جبران خليل جبران',
    language: 'Arabic',
    date: '2025-04-01T00:00:00Z',
    day: 1,
  },
  {
    id: 'ov3',
    text: 'وقت خوابوں میں بہنے والی ندی کی طرح ہے',
    author: 'الّامہ اقبال',
    language: 'Urdu',
    date: '2025-04-01T00:00:00Z',
    day: 1,
  },
  {
    id: 'ov4',
    text: 'The stars are the street lights of eternity',
    author: 'Emily Dickinson',
    language: 'English',
    date: '2025-04-02T00:00:00Z',
    day: 2,
  },
  {
    id: 'ov5',
    text: 'النجوم هي مصابيح أنوار الأبدية',
    author: 'نزار قباني',
    language: 'Arabic',
    date: '2025-04-02T00:00:00Z',
    day: 2,
  },
  {
    id: 'ov6',
    text: 'ستارے ابدیت کی سڑک کی روشنیاں ہیں',
    author: 'فیض احمد فیض',
    language: 'Urdu',
    date: '2025-04-02T00:00:00Z',
    day: 2,
  },
];

// Mock poets data
export const mockPoets: Poet[] = [
  {
    id: '1',
    name: 'Emily Chen',
    email: 'emily@example.com',
    country: 'United States',
    points: 145,
    poemsCount: 7,
    likesReceived: 96,
    bio: 'Award-winning poet focusing on themes of nature and human connection.',
  },
  {
    id: '2',
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    country: 'Egypt',
    points: 132,
    poemsCount: 5,
    likesReceived: 82,
    bio: 'Contemporary Arabic poet exploring the intersection of tradition and modernity.',
  },
  {
    id: '3',
    name: 'Farah Khan',
    email: 'farah@example.com',
    country: 'Pakistan',
    points: 118,
    poemsCount: 6,
    likesReceived: 75,
    bio: 'Urdu poet with a focus on cultural heritage and urban experiences.',
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@example.com',
    country: 'Canada',
    points: 98,
    poemsCount: 4,
    likesReceived: 59,
  },
  {
    id: '5',
    name: 'Alex Rivera',
    email: 'alex@example.com',
    country: 'Mexico',
    points: 87,
    poemsCount: 3,
    likesReceived: 42,
  },
  {
    id: '6',
    name: 'Layla Mahmoud',
    email: 'layla@example.com',
    country: 'Lebanon',
    points: 76,
    poemsCount: 3,
    likesReceived: 35,
  },
  {
    id: '7',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    country: 'United Kingdom',
    points: 65,
    poemsCount: 2,
    likesReceived: 28,
  },
  {
    id: '8',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    country: 'Australia',
    points: 54,
    poemsCount: 2,
    likesReceived: 19,
  },
];