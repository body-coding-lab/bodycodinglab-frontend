import { FileResponseDto } from "@/dtos/file.response.dto";
import { TrainerCareerResponseDto } from "./trainer-career.response.dto";
import { TrainerLicenseDeatilResponseDto } from "./trainer-license-detail.response.dto";

export interface TrainerDetailResponseDto {
  trainerId: number;
  name: string;
  jobAddress: string;
  shortIntroduce: string;
  longIntroduce: string;
  educationName: string;
  educationEntrance: string;
  educationGraduate: string;
  careers: TrainerCareerResponseDto[];
  licenses: TrainerLicenseDeatilResponseDto[];
  profileImage: string;
  infoImages?: FileResponseDto[];
  licenseImages?: FileResponseDto[];
}
