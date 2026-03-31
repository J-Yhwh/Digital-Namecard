// src/types.ts

// Define the Profile interface
export interface Profile {
    id: number;
    name: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
}

// Define the Contact interface
export interface Contact {
    phoneNumber?: string;
    address?: string;
    website?: string;
    socialLinks?: { [key: string]: string };
}