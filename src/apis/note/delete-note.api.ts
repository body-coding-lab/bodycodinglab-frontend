import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { FIND_BY_NOTE_ID_API } from "../constants";
import { AxiosError } from "axios";


export const DeleteNoteReqeust = async(accessToken: string, noteId: number): Promise<ResponseDto<void>> => {
  try{
    const response = await axiosInstance.delete(FIND_BY_NOTE_ID_API(noteId), bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}