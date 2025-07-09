export interface BoardRequestDto {
  category: string;
  title: string;
  content: string;
  files?: File[];
}