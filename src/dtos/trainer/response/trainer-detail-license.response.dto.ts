import { FileResponseDto } from "@/dtos/file.response.dto";

export interface TrainerLicenseResponseDto {
  id: number;
  trainerId: number;
  licenseType: string;
  licenseName: string;
  licenseImages?: FileResponseDto[];
}