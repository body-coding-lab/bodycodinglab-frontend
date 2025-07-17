type UserRole = "MEMBER" | "TRAINER" | "ADMIN";
type Gender = "MALE" | "FEMAIL";

export interface GetUserMatchListResponseDto{
  matchId: number;
  role: UserRole;
  name: string;
  gender: Gender;
  age: number;
}