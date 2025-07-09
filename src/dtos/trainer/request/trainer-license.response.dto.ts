export interface TrainerLicenseRequestDto {
  licenseType: string;
  licenseName: string;
  files?: File[];
}