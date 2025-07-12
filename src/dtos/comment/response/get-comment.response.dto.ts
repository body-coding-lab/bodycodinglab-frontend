export interface GetCommentResponseDto {
  id: number;
  commenterUsername: string;
  commenterName: string;
  commenterProfileImageUrl: string;
  content: string;
  createdAt: string;
}