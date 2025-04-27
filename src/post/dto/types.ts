import { PostData } from "../types.js";

export interface PostDataDto extends Omit<PostData, "publishDate"> {
  publishDate: string;
}
