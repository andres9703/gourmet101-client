export interface GourmetUserEntity {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    user_type: 'normal' | 'business';
    profile_picture?: string;
    phone?: string;
}