import ResponseDto from "@/dtos/response.dto";
import { axiosInstance } from "../axiosConfig";
import { SINGLE_FILE_API } from "../constants";
import { AxiosError } from "axios";

export const getSingleFileRequest = async (fileId: number): Promise<Blob> => {
  try {
    const response = await axiosInstance.get(
      SINGLE_FILE_API(fileId), {
        responseType: "blob"
      }
    );
    return response.data;
  } catch (error) {
    throw error as AxiosError<ResponseDto>;
  }
}