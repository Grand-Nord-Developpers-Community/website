export default interface ActivityAndEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  datetime: string;
  link: string | null;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  creator: {
    id: string;
    email: string | null;
    name: string | null;
    username: string | null;
    password: string | null;
    email_verified: boolean;
    two_factor_secret: string | null;
    image: string | null;
    bio: string | null;
    role: string | null;
    experiencePoints: number | null;
    location: string | null;
    phoneNumber: string | null;
    githubLink: string | null;
    twitterLink: string | null;
    instagramLink: string | null;
    websiteLink: string | null;
    streak: number | null;
    skills: { id: string; text: string }[] | null;
    lastActive: string | null;
    isCompletedProfile: boolean | null;
    isCheckProfile: boolean | null;
    createdAt: string;
    updatedAt: string;
  };
}
