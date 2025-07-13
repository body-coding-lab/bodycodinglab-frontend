import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_SENT_NOTE_API } from "../constants";
import { AxiosError } from "axios";
import { GetNoteListResponseDto } from "@/dtos/note/response/get-noteList.response.dto";

export const GetSentNoteRequest = async(accessToken: string, page: number, size: number): Promise<ResponseDto<GetNoteListResponseDto[]>> => {
  try{
    const response = await axiosInstance.get(GET_SENT_NOTE_API(page, size), bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}