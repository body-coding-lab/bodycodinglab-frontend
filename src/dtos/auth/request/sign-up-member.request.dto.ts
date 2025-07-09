export interface SignUpMemberRequestDto {
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
  birthdate: string;
  gender: 'MALE' | 'FEMALE';
  phone: string;
  email: string;
  memberAddress: string;
}