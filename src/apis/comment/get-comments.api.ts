import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_COMMENTS_API } from "../constants";
import { AxiosError } from "axios";
import { GetCommentResponseDto } from "@/dtos/comment/response/get-comment.response.dto";

export const getCommentsRequest = async (boardId: number): Promise<ResponseDto<GetCommentResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(
      GET_COMMENTS_API(boardId)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}