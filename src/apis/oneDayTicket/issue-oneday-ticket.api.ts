import { TicketIssueRequestDto } from "@/dtos/oneDayTicket/request/ticket-issue.request.dto";
import ResponseDto from "@/dtos/response.dto";
import { ISSUE_TICKET_API } from "../constants";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";

export const issueOneDayTicket = async (dto: TicketIssueRequestDto, accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.post(ISSUE_TICKET_API, dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}