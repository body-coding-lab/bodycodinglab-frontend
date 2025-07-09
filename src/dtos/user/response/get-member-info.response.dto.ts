export interface GetMemberInfoResponseDto {
  username: string;
  name: string;
  birthdate: string;
  gender: 'MALE' | 'FEMALE';
  phone: string;
  email: string;
  memberAddress: string;
}