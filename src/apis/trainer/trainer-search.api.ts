import ResponseDto from "@/dtos/response.dto";
import { TrainerCareerResponseDto } from "@/dtos/trainer/response/trainer-career.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { GET_ALL_TRAINER_INFO, GET_TRAINER_BY_ADDRESS, GET_TRAINER_BY_NAME, GET_TRAINER_CAREER, GET_TRAINER_INFO, GET_TRAINER_LICENSE } from "../constants";
import { TrainerLicenseResponseDto } from "@/dtos/trainer/response/trainer-license.response.dto";
import { TrainerListResponseDto } from "@/dtos/trainer/response/trainer-list.response.dto";
import { TrainerDetailResponseDto } from "@/dtos/trainer/response/trainer-detail.response.dto";

export const getCareerList = async (): Promise<ResponseDto<TrainerCareerResponseDto[]>> => {
  try {
    const response = await axiosInstance
    .get(GET_TRAINER_CAREER);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const getRecentCareer = async (): Promise<ResponseDto<TrainerLicenseResponseDto>> => {
  try {
    const response = await axiosInstance.get(GET_TRAINER_LICENSE);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const getAllTrainers = async (): Promise<ResponseDto<TrainerListResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_ALL_TRAINER_INFO);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const getTrainerById = async (trainerId: number): Promise<ResponseDto<TrainerDetailResponseDto>> => {
  try {
    const response = await axiosInstance.get(GET_TRAINER_INFO(trainerId));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const getTrainerByName = async (name: string): Promise<ResponseDto<TrainerListResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_TRAINER_BY_NAME, {
      params: { name },
    });
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const getTrainerByAddress = async (address: string): Promise<ResponseDto<TrainerListResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_TRAINER_BY_ADDRESS, {
      params: { address },
    });
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}