import ResponseDto from "@/dtos/response.dto";
import { TrainerCareerResponseDto } from "@/dtos/trainer/response/trainer-career.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { TrainerCareerRequestDto } from "@/dtos/trainer/request/trainer-career.response.dto";
import { AxiosError } from "axios";
import {  GET_TRAINER_CAREER_RECENT, TRAINER_CAREER, TRAINER_CAREER_DETAIL } from "../constants";

export const postCareer = async (dto: TrainerCareerRequestDto, accessToken: string): Promise<ResponseDto<TrainerCareerResponseDto>> => {
  try {
    const response = await axiosInstance.post(TRAINER_CAREER, dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const updateCareer = async (careerId: number, dto: TrainerCareerRequestDto, accessToken: string): Promise<ResponseDto<TrainerCareerResponseDto>> => {
  try {
    const response = await axiosInstance.put(TRAINER_CAREER_DETAIL(careerId), dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const deleteCareer = async (careerId: number, accessToken: string): Promise<ResponseDto<TrainerCareerResponseDto>> => {
  try {
    const response = await axiosInstance.delete(TRAINER_CAREER_DETAIL(careerId), bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const deleteAllCareer = async (accessToken: string): Promise<ResponseDto<null>> => {
  try {
    const response = await axiosInstance.delete(TRAINER_CAREER, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const getCareerList = async (accessToken: string): Promise<ResponseDto<TrainerCareerResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(TRAINER_CAREER, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const getRecentCareer = async (accessToken: string): Promise<ResponseDto<TrainerCareerResponseDto>> => {
  try {
    const response = await axiosInstance.get(GET_TRAINER_CAREER_RECENT, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}