import ResponseDto from "@/dtos/response.dto";
import { TrainerLicenseRequestDto } from "@/dtos/trainer/request/trainer-license.response.dto";
import { TrainerLicenseResponseDto } from "@/dtos/trainer/response/trainer-license.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { DELETE_ALL_TRAINER_LICENSE, DELETE_TRAINER_LICENSE, GET_TRAINER_LICENSE, GET_TRAINER_LICENSE_RECENT, POST_TRAINER_LICENSE, UPDATE_TRAINER_LICENSE } from "../constants";
import { AxiosError } from "axios";

const convertToFormData = (dto: TrainerLicenseRequestDto): FormData => {
  const formData = new FormData();

  formData.append("licenseType", dto.licenseType);
  formData.append("licenseName", dto.licenseName);

  if (dto.files && dto.files.length > 0) {
    Array.from(dto.files).forEach((file) => {
      formData.append("files", file);
    });
  }

  return formData;
}

export const postLicense = async (dto: TrainerLicenseRequestDto, accessToken: string): Promise<ResponseDto<TrainerLicenseResponseDto>> => {
  try{
    const formData = convertToFormData(dto);
    const response = await axiosInstance.post(POST_TRAINER_LICENSE, formData, {
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

export const updateLicense = async (licenseId: number, dto: TrainerLicenseRequestDto, accessToken: string): Promise<ResponseDto<TrainerLicenseResponseDto>> => {
  try{
    const formData = convertToFormData(dto);
    const response = await axiosInstance.put(UPDATE_TRAINER_LICENSE(licenseId), formData, {
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

export const deleteLicense = async (licenseId: number, accessToken: string): Promise<ResponseDto<TrainerLicenseResponseDto>> => {
  try {
    const response = await axiosInstance.delete(DELETE_TRAINER_LICENSE(licenseId), bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const deleteAllLicense = async (accessToken: string): Promise<ResponseDto<null>> => {
  try {
    const response = await axiosInstance.delete(DELETE_ALL_TRAINER_LICENSE, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const getCareerList = async (accessToken: string): Promise<ResponseDto<TrainerLicenseResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_TRAINER_LICENSE, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const getRecentCareer = async (accessToken: string): Promise<ResponseDto<TrainerLicenseResponseDto>> => {
  try {
    const response = await axiosInstance.get(GET_TRAINER_LICENSE_RECENT, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}