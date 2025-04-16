import { NoteInfo } from "@shared/models";

export const notesMock: NoteInfo[] = [
    {
        title: 'Welcome 👋',
        lastEditTime: new Date().getTime(),
    },
    {
        title: 'Meeting Notes 📝',
        lastEditTime: new Date().getTime() - 3600 * 1000, // 1 hour ago
    },
    {
        title: 'Shopping List 🛒',
        lastEditTime: new Date().getTime() - 2 * 3600 * 1000, // 2 hours ago
    },
    {
        title: 'Project Ideas 💡',
        lastEditTime: new Date().getTime() - 24 * 3600 * 1000, // 1 day ago
    },
    {
        title: 'Travel Plans ✈️',
        lastEditTime: new Date().getTime() - 3 * 24 * 3600 * 1000, // 3 days ago
    },
    {
        title: 'Workout Routine 🏋️',
        lastEditTime: new Date().getTime() - 7 * 24 * 3600 * 1000, // 7 days ago
    },
    {
        title: 'Book Recommendations 📚',
        lastEditTime: new Date().getTime() - 10 * 24 * 3600 * 1000, // 10 days ago
    },
    {
        title: 'Recipe Ideas 🍳',
        lastEditTime: new Date().getTime() - 14 * 24 * 3600 * 1000, // 14 days ago
    },
];
