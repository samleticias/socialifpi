import { CommentDTO } from '../dto/CommentDTO'

export type CreatePostDTO = {
    title: string;
    content: string;
    categoryName: string;
};

export type PostWithCommentsDTO = {
  id: number;
  title: string;
  content: string;
  imagePath?: string | null;
  date: Date;
  likes: number;
  category?: string | null;
  comments: CommentDTO[];
};
