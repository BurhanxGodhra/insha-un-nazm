import { Poem } from '../types/poem';
import { OpeningVerse } from '../types/verse';
import { Poet } from '../types/poet';

// Mock poems data
export const mockPoems: Poem[] = [
  {
    id: '1',
    title: 'Whispers of Dawn',
    content: `The morning light breaks through the clouds,
A symphony of colors, bold and proud.
Birds sing their chorus, nature's sweet sound,
As dew-kissed grass sparkles across the ground.

The world awakens to a brand new day,
As shadows of night gently fade away.
In this moment of peace, so pure and bright,
I find my solace in the morning light.`,
    author: { id: '1', name: 'Emily Chen' },
    language: 'English',
    date: '2025-04-01T08:30:00Z',
    likes: 42,
    comments: [
      {
        id: 'c1',
        text: 'Beautiful imagery! I can almost feel the morning dew.',
        author: { id: '3', name: 'Michael Johnson' },
        date: '2025-04-01T10:15:00Z',
      },
      {
        id: 'c2',
        text: 'This poem brings back memories of peaceful mornings in the countryside.',
        author: { id: '4', name: 'Sarah Williams' },
        date: '2025-04-01T12:45:00Z',
      },
    ],
    views: 128,
    approved: true,
  },
  {
    id: '2',
    title: 'صمت الليل',
    content: `في صمت الليل أجد نفسي
وحيداً مع أفكاري التي لا تنام
النجوم تتلألأ في السماء البعيدة
كأنها تهمس لي أسرار الكون

القمر ينير دربي في الظلام
يرسم ظلالاً ترقص على الجدران
وأنا أستمع إلى نبضات قلبي
تخبرني قصصاً لم أسمعها من قبل`,
    author: { id: '2', name: 'Ahmed Hassan' },
    language: 'Arabic',
    date: '2025-04-02T19:45:00Z',
    likes: 38,
    comments: [
      {
        id: 'c3',
        text: 'رائع جداً، استطعت أن تنقل الإحساس بسكون الليل بشكل جميل',
        author: { id: '5', name: 'Layla Mahmoud' },
        date: '2025-04-02T21:30:00Z',
      },
    ],
    views: 95,
    approved: true,
  },
  {
    id: '3',
    title: 'شام کی روشنی',
    content: `شام کی روشنی میں ڈوبا ہوا منظر
جھیل کے پانی پر ناچتی ہوئی کرنیں
ہوا کے ساتھ لہراتے درخت
اور پرندوں کی واپسی کا شور

یہ وقت کتنا خوبصورت ہے
جب دن رات میں ڈھلتا ہے
رنگوں کا یہ کھیل، یہ تبدیلی
میری روح کو سکون دیتی ہے`,
    author: { id: '3', name: 'Farah Khan' },
    language: 'Urdu',
    date: '2025-04-03T18:20:00Z',
    likes: 27,
    comments: [],
    views: 73,
    approved: true,
  },
  {
    id: '4',
    title: 'Urban Symphony',
    content: `Steel and glass reach for the sky,
Where dreams and ambitions amplify.
The rhythm of footsteps, a steady beat,
Echoing stories on every street.

Car horns and whispers blend in the air,
A cacophony of lives and souls laid bare.
This concrete jungle, this human maze,
Captures my heart in countless ways.`,
    author: { id: '4', name: 'David Wilson' },
    language: 'English',
    date: '2025-04-04T14:10:00Z',
    likes: 19,
    comments: [
      {
        id: 'c4',
        text: 'You\'ve captured city life perfectly!',
        author: { id: '1', name: 'Emily Chen' },
        date: '2025-04-04T16:35:00Z',
      },
    ],
    views: 68,
    approved: false,
  },
  {
    id: '5',
    title: 'Digital Dreams',
    content: `In the realm of ones and zeros,
We build worlds beyond imagination.
Pixels paint realities unknown,
Algorithms dance to their own creation.

Through screens we connect,
Across oceans and time zones.
Digital whispers of humanity,
In the vastness of the virtual unknown.`,
    author: { id: '5', name: 'Alex Rivera' },
    language: 'English',
    date: '2025-04-05T09:50:00Z',
    likes: 31,
    comments: [],
    views: 82,
    approved: false,
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