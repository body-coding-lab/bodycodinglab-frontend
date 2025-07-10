import { GetNoteResponseDto } from "@/dtos/note/response/get-note.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_RECEIVED_NOTE_API } from "../constants";
import { AxiosError } from "axios";

export const GetReceiveNoteRequest = async(accessToken: string, page: number, size: number): Promise<ResponseDto<GetNoteResponseDto[]>> => {
  try{
    const response = await axiosInstance.get(GET_RECEIVED_NOTE_API(page, size), bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}