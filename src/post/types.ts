export interface PostStructure {
  _id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  content: string;
  publishDate: Date;
}
