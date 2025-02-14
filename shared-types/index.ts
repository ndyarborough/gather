export interface SafeUser {
    id: number;
    email: string;
    fullName: string;
    profilePic?: string;
    preferences: Preferences;
    sentMessages: Message[];
};

export interface Preferences {
    id: number;
    userId: number;
    user: SafeUser;
    rsvpVisibility: boolean;
}

export interface Message {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    createdAt: Date;
    eventId?: number;
    sender: SafeUser;
    receiver: SafeUser;
}

export interface Event {
    id: number;
    name: string;
    description: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    hostId: number;
    host: SafeUser;
    image?: string;
}

export interface RSVP {
    id: number;
    userId: number;
    eventId: number;
    createdt: Date;
    user: SafeUser;
    event: Event;
}

export interface Interest {
    id: number;
    userId: number;
    eventId: number;
    user: SafeUser;
    event: Event;
}