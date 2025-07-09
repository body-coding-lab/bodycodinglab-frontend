import { FileResponseDto } from "@/dtos/file.response.dto";

export interface BoardDetailResponseDto {
  boardId: number;
  matchId: number;
  writerId: number;
  category: string;
  title: string;
  content: string;
  writerName: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  boardImages?: FileResponseDto[];
}