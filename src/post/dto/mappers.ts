import { PostData } from "../types.js";
import { PostDataDto } from "./types.js";

export const mapPostDataDtoToPostData = ({
  publishDate,
  ...postDataDto
}: PostDataDto): PostData => {
  return {
    ...postDataDto,
    publishDate: new Date(publishDate),
  };
};
