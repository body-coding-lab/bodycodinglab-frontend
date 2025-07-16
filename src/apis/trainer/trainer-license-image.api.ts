import { FileResponseDto } from "@/dtos/file.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { DELETE_FILE, GET_MULTI_FILES, UPLOAD_MULTI_FILES } from "../constants";
import { AxiosError } from "axios";

export const uploadTrainerLicenseImages = async (
  files: File[],
  trainerId: number,
  accessToken: string
): Promise<ResponseDto<FileResponseDto[]>> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await axiosInstance.post(`${UPLOAD_MULTI_FILES}?targetId=${trainerId}&targetType=LICENSE`,
      formData,{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        }
      });
    return responseSuccessHandler(response);
  } catch (error) {
      return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const deleteTrainerLicneseImages = async (
  fileId: number,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(`${DELETE_FILE}/${fileId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
    return responseSuccessHandler(response);
  } catch (error) {
      return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const getTrainerLicenseImages = async (
  trainerId: number,
): Promise<ResponseDto<FileResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_MULTI_FILES, {
        params: {
          targetId: trainerId,
          targetType: "LICENSE",
        }
      });
    return responseSuccessHandler(response);
  } catch (error) {
      return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}