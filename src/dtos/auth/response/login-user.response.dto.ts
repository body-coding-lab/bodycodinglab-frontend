export interface LoginUserResponseDto {
  token: string;
  exprTime: number;
  id: number;
  role: 'MEMBER' | 'TRAINER' | 'ADMIN';
  username: string;
  name: string;
  profileImageUrl: string;
}