export interface GetUserInfoResponseDto {
    id: number;
    role: 'MEMBER' | 'TRAINER' | 'ADMIN';
    username: string;
    name: string;
    profileImageUrl: string;
    trainerStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
}