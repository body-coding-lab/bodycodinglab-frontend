import { LoginUserResponseDto } from "./login-user.response.dto";

export interface LoginRejectedTrainerResponseDto extends LoginUserResponseDto {
  trainerStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
}