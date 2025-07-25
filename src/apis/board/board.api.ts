import { BoardRequestDto } from "@/dtos/board/request/board.request.dto";
import { BoardDetailResponseDto } from "@/dtos/board/response/board-detail.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { CREATE_POST, GET_POST_LIST, POST_DETAIL, SEARCH_POST_BY_CONTENT, SEARCH_POST_BY_NAME, SEARCH_POST_BY_TITLE } from "../constants";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { BoardListResponseDto } from "@/dtos/board/response/board-list.response.dto";
import PageDto from "@/dtos/page.dto";

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

export const createPost = async (matchId: number, dto: BoardRequestDto, accessToken: string): Promise<ResponseDto<BoardDetailResponseDto>> => {
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

export const updatePost = async (matchId: number, postId: number, dto: BoardRequestDto, accessToken: string): Promise<ResponseDto<BoardDetailResponseDto>> => {
  try{
      const formData = convertToFormData(dto);
      const response = await axiosInstance.put(POST_DETAIL(matchId, postId), formData, {
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
    const response = await axiosInstance.delete(POST_DETAIL(matchId, postId), bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const getPost = async (matchId: number, postId: number, accessToken: string): Promise<ResponseDto<BoardDetailResponseDto>> => {
  try{
      const response = await axiosInstance.get(POST_DETAIL(matchId, postId), {
        ...bearerAuthorization(accessToken)
    });
      return responseSuccessHandler(response);
    } catch (error) {
      return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
}

export const getPostList = async (matchId: number, category: string, accessToken: string, page = 0, size = 10): Promise<ResponseDto<PageDto<BoardListResponseDto>>> => {
  try{
      const response = await axiosInstance.get(GET_POST_LIST(matchId), {
        ...bearerAuthorization(accessToken),
        params: { category, page, size }
    });
      return responseSuccessHandler(response);
    } catch (error) {
      return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
}

export const searchPostByName = async (
  matchId: number,
  accessToken: string,
  category: string,
  writerName?: string,
  page: number = 0,
  size: number = 10): Promise<ResponseDto<PageDto<BoardListResponseDto>>> => {
  try{
      const response = await axiosInstance.get(SEARCH_POST_BY_NAME(matchId), {
        ...bearerAuthorization(accessToken),
        params: {
          category,
          writerName,
          page,
          size,
        }
    });
      return responseSuccessHandler(response);
    } catch (error) {
      return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
}

export const searchPostByContent = async (
  matchId: number,
  accessToken: string,
  category: string,
  content?: string,
  page: number = 0,
  size: number = 10): Promise<ResponseDto<PageDto<BoardListResponseDto>>> => {
  try{
      const response = await axiosInstance.get(SEARCH_POST_BY_CONTENT(matchId), {
        ...bearerAuthorization(accessToken),
        params: {
          category,
          content,
          page,
          size,
        }
    });
      return responseSuccessHandler(response);
    } catch (error) {
      return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
}

export const searchPostByTitle = async (
  matchId: number,
  accessToken: string,
  category: string,
  title?: string,
  page: number = 0,
  size: number = 10): Promise<ResponseDto<PageDto<BoardListResponseDto>>> => {
  try{
      const response = await axiosInstance.get(SEARCH_POST_BY_TITLE(matchId), {
        ...bearerAuthorization(accessToken),
        params: {
          category,
          title,
          page,
          size,
        }
    });
      return responseSuccessHandler(response);
    } catch (error) {
      return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
}