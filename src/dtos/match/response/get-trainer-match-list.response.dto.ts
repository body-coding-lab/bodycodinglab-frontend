type Gender = "MALE" | "FEMAIL";

export interface GetTrainerMatchListResponseDto{
  matchId: number;
  memberId: number;
  memberName: string;
  memberGender: Gender;
}