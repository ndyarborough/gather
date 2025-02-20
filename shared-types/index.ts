 export interface SafeUser {
    id: string;
    email: string;
    fullName: string;
    profilePic?: string;
};

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
    startTime: Date;
    endTime: Date;
    hostId: string;
    host: SafeUser;
    image?: string;
}

export interface RSVP {
    id: string;
    userId: string;
    eventId: string;
    createdt: Date;
    user: SafeUser;
    event: Event;
}

export interface Interest {
    id: string;
    userId: string;
    eventId: string;
    user: SafeUser;
    event: Event;
}