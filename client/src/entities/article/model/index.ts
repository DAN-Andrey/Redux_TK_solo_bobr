import type { UserType } from "../../user/model";
export type ArticleType = {
    id: number;
    title: string;
    content: string;
    userId: number;
    createdAt?: string;
    updatedAt?: string;
    user?: UserType
}