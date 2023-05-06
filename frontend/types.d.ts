interface SettingsDataProps {
  id: number;
  title: string;
  link: string;
  icon?: React.ReactElement;
}

interface MessageProps {
  _id: string;
  content: string;
  sender: UserProps;
  readBy: UserProps[];
  conversationId: ConvProps;
  createdAt: Date;
  updatedAt: Date;
  messageType?: string;
  media: [string];
  mediaType: string;
}
interface UserProps {
  _id: string;
  avatar: string;
  cover?: string;
  createdAt: Date;
  email: string;
  kind?: string;
  updatedAt: Date;
  username: string;
  phone?: string;
  website?: string;
  description?: string;
}

interface MediaProps {
  albumId: string;
  creationTime: Date;
  duration: number;
  filename: string;
  height: string;
  id: string;
  mediaType: string;
  modificationTime: Date;
  uri: string;
  width: number;
}

interface ConvProps {
  _id: string;
  img: string;
  chatName: string;
  createdAt: Date;
  groupAdmins: UserProps[];
  isGroup: boolean;
  updatedAt: Date;
  users: UserProps[];
  latestMessage: MessageProps;
}
