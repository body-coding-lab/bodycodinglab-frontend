import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { DELETE_USER_API } from "../constants";
import { AxiosError } from "axios";
import { DeleteUserRequestDto } from "@/dtos/user/request/delete-user.request.dto";

export const deleteUserRequest = async (dto: DeleteUserRequestDto, accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(
      DELETE_USER_API,
      {
        ...bearerAuthorization(accessToken),
        data: dto
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}