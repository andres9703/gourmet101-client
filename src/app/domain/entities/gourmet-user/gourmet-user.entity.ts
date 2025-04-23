export interface GourmetUserEntity {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: 'normal' | 'business';
    profilePicture?: string;
    phone?: string;
    userId: string;
    isProfileComplete: boolean;
}