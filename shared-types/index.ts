 export interface SafeUser {
    id: string;
    email: string;
    fullName: string;
    profilePic?: string;
};

export interface PrivateUserData {
    events: string[];
    rsvps: string[];
    interests: string[];
}

export interface Preferences {
    id: string;
    userId: string;
    user: SafeUser;
    rsvpVisibility: boolean;
}

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: Date; 
    eventId?: string;
    sender: SafeUser;
    receiver: SafeUser;
}

export interface Event {
    id: string;
    name: string;
    description: string;
    date: Date;
    startTime: string;
    endTime: string;
    hostId: string;
    host: SafeUser;
    image?: string;
    attendees: SafeUser[];
    interested: SafeUser[];
}