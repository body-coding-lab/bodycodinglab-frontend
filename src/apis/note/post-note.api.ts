import { PostNoteRequestDto } from "@/dtos/note/request/post-note.request.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { NOTE_API } from "../constants";
import { AxiosError } from "axios";
import { postNoteResponseDto } from "@/dtos/note/response/post-note.response.dto";


export const PostNoteRequest = async (accessToken: string,  dto: PostNoteRequestDto ): Promise<ResponseDto<postNoteResponseDto>> => {
  try{
    const response = await axiosInstance.post(NOTE_API, dto, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}