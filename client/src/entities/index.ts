import type { ArticleType } from "./article/model/index";
import type { UserType } from "./user/model";

export type ResponceType = {
  status: string;
  data: UserType | ArticleType | null;
  massage: string;
  error: string | null;
};
