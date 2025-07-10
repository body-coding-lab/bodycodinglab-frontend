import { GetNoteResponseDto } from "@/dtos/note/response/get-note.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";

import { AxiosError } from "axios";
import { FIND_BY_NOTE_ID_API } from "../constants";

export const GetNoteRequest = async(accessToken: string, noteId: number): Promise<ResponseDto<GetNoteResponseDto>> => {
  try{
    const response = await axiosInstance.get(FIND_BY_NOTE_ID_API(noteId), bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}