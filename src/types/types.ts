// types.ts

export default interface DecryptedToken {
    id: number;
    email: string;
    username: string;
    password: string;
    profilepicture: string;
    ip: string;
    useragent: string;
    isAdmin: boolean;
    isEmailConfirmed: boolean;
    privateChats: PrivateChat[];
    groupChats: GroupChat[];
    messages: Message[];
  }
  
  export interface PrivateChat {
    id: number;
    users: User[];
    messages: Message[];
  }
  
  export interface GroupChat {
    id: number;
    name?: string;
    users: User[];
    messages: Message[];
  }
  
  export interface Message {
    id: number;
    content: string;
    createdAt: Date;
    sender: User;
    senderId: number;
    privateChat?: PrivateChat;
    privateChatId?: number;
    groupChat?: GroupChat;
    groupChatId?: number;
  }
  
  export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    ip: string;
    useragent: string;
    profilepicture: string;
    isAdmin: boolean;
    isEmailConfirmed: boolean;
    privateChats: PrivateChat[];
    groupChats: GroupChat[];
    messages: Message[];
  }
  