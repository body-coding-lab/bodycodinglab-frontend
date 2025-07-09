import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { CREATE_COMMENTS_API } from "../constants";
import { AxiosError } from "axios";
import { CommentRequestDto } from "@/dtos/comment/request/comment.request.dto";

export const createCommentRequest = async (boardId: number, dto: CommentRequestDto, accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.post(
      CREATE_COMMENTS_API(boardId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}