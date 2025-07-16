import { FileResponseDto } from "@/dtos/file.response.dto";

export interface TrainerLicenseDeatilResponseDto {
  id: number;
  trainerId: number;
  licenseType: string;
  licenseName: string;
  licenseImages?: FileResponseDto[];
}