import ResponseDto from "@/dtos/response.dto";
import { TrainerInfofRequestDto } from "@/dtos/trainer/request/trainer-info.response.dto";
import { TrainerinfoResponseDto } from "@/dtos/trainer/response/trainer-info.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_TRAINER_INFO, PUT_TRAINER_INFO } from "../constants";
import { AxiosError } from "axios";

const convertToFormData = (dto: TrainerInfofRequestDto): FormData => {
  const formData = new FormData();

  formData.append("jobAddress", dto.jobAddress);
  formData.append("shortIntroduce", dto.shortIntroduce);
  formData.append("longIntroduce", dto.longIntroduce);
  formData.append("educationName", dto.educationName);
  formData.append("educationEntrance", dto.educationEntrance);
  formData.append("educationGraduate", dto.educationGraduate);

  if (dto.files && dto.files.length > 0) {
    Array.from(dto.files).forEach((file) => {
      formData.append("files", file);
    });
  }

  return formData;
};

export const updateInfo = async (dto: TrainerInfofRequestDto, accessToken: string): Promise<ResponseDto<TrainerinfoResponseDto>> => {
  try{
      const formData = convertToFormData(dto);
      const response = await axiosInstance.put(PUT_TRAINER_INFO, formData, {
      headers: {
        ...bearerAuthorization(accessToken).headers,
        "Content-Type": "multipart/form-data",
      },
    });
          return responseSuccessHandler(response);
    } catch (error) {
      return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
}

export const getInfo = async (trainerId: number, accessToken: string): Promise<ResponseDto<TrainerinfoResponseDto>> => {
  try{
      const response = await axiosInstance.get(GET_TRAINER_INFO(trainerId), {
        ...bearerAuthorization(accessToken)
    });
      return responseSuccessHandler(response);
    } catch (error) {
      return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
}