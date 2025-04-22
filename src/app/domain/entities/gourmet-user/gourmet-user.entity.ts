export interface GourmetUserEntity {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: 'normal' | 'business';
    profilePicture?: string;
    phone?: string;
    user_id: string;
    isProfileComplete: boolean;
}