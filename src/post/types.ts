export interface PostStructure {
  _id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  content: string;
  author: string;
  publishDate?: Date;
}

export type PostData = Omit<PostStructure, "_id">;
