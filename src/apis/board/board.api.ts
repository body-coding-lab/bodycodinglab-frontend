import { BoardRequestDto } from "@/dtos/board/request/board.request.dto";
import { BoardDetailResponseDto } from "@/dtos/board/response/board-detail.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { CREATE_POST, DELETE_POST, GET_POST_DETAIL, GET_POST_LIST, SEARCH_POST, UPDATE_POST } from "../constants";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { BoardListResponseDto } from "@/dtos/board/response/board-list.response.dto";

const convertToFormData = (dto: BoardRequestDto): FormData => {
  const formData = new FormData();

  formData.append("category", dto.category);
  formData.append("title", dto.title);
  formData.append("content", dto.content);

  if (dto.files && dto.files.length > 0) {
    Array.from(dto.files).forEach((file) => {
      formData.append("files", file);
    });
  }

  return formData;
};

export const crestePost = async (matchId: number, dto: BoardRequestDto, accessToken: string): Promise<ResponseDto<BoardDetailResponseDto>> => {
  try{
    const formData = convertToFormData(dto);
    const response = await axiosInstance.post(CREATE_POST(matchId), formData, {
    headers: {
      ...bearerAuthorization(accessToken).headers,
      "Content-Type": "multipart/form-data",
    },
  });
        return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const updatePost = async (matchId: number, dto: BoardRequestDto, accessToken: string): Promise<ResponseDto<BoardDetailResponseDto>> => {
  try{
      const formData = convertToFormData(dto);
      const response = await axiosInstance.put(UPDATE_POST(matchId), formData, {
      headers: {
        ...bearerAuthorization(accessToken).headers,
        "Content-Type": "multipart/form-data",
      },
    });
          return responseSuccessHandler(response);
    } catch (error) {
      return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
}

export const deletePost = async (matchId: number, postId: number, accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(DELETE_POST(matchId, postId), bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const getPost = async (matchId: number, postId: number, accessToken: string): Promise<ResponseDto<BoardDetailResponseDto>> => {
  try{
      const response = await axiosInstance.get(GET_POST_DETAIL(matchId, postId), {
        ...bearerAuthorization(accessToken)
    });
      return responseSuccessHandler(response);
    } catch (error) {
      return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
}

export const getPostList = async (matchId: number, accessToken: string, page = 0, size = 10): Promise<ResponseDto<Page<BoardListResponseDto>>> => {
  try{
      const response = await axiosInstance.get(GET_POST_LIST(matchId), {
        ...bearerAuthorization(accessToken),
        params: { page, size }
    });
      return responseSuccessHandler(response);
    } catch (error) {
      return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
}

export const searchPost = async (matchId: number, accessToken: string, params: searchPostParams): Promise<ResponseDto<Page<BoardListResponseDto>>> => {
  try{
      const response = await axiosInstance.get(SEARCH_POST(matchId), {
        ...bearerAuthorization(accessToken),
        params,
    });
      return responseSuccessHandler(response);
    } catch (error) {
      return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
}

interface searchPostParams {
  category: string;
  writerName?: string;
  title?: string;
  content?: string;
  page?: number;
  size?: number;
}