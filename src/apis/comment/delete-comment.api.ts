import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { DELETE_COMMENTS_API } from "../constants";
import { AxiosError } from "axios";

export const deleteCommentRequest = async (boardId: number, commentId: number, accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(
      DELETE_COMMENTS_API(boardId, commentId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}