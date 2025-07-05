import { GetMemberFormResponseDto } from "@/dtos/memberForm/response/get-memberForm.response.dto";

type Gender = "MALI" | "FEMAIL";


export interface GetTrainerMatchResponseDto{
  profileImageUrl: string | null | undefined;
  memberName: string;
  memberAge: number;
  memberGender: Gender;
  memberPhone: string;
  memberAddress: string;
  memberFormResponseDto: GetMemberFormResponseDto | null | undefined;
}
