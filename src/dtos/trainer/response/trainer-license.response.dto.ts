export interface TrainerLicenseResponseDto {
  id: number;
  trainerId: number;
  licenseType: string;
  licenseName: string;
  fileNmae?: string;
}