import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "@/apis/axiosConfig";
import { DELETE_MULTI_FILES, GET_MULTI_FILES, UPLOAD_MULTI_FILES } from "@/apis/constants";
import { FileResponseDto } from "@/dtos/file.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { AxiosError } from "axios";

export const uploadTrainerInfoImages = async (
  files: File[],
  trainerId: number,
  accessToken: string
): Promise<ResponseDto<FileResponseDto[]>> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await axiosInstance.post(`${UPLOAD_MULTI_FILES}?targetId=${trainerId}&targetType=INFO`,
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

export const deleteTrainerInfoImages = async (
  fileId: number,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(`${DELETE_MULTI_FILES}/${fileId}`,
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

export const getTrainerInfoImages = async (
  trainerId: number,
): Promise<ResponseDto<FileResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_MULTI_FILES, {
        params: {
          targetId: trainerId,
          targetType: "INFO",
        }
      });
    return responseSuccessHandler(response);
  } catch (error) {
      return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}