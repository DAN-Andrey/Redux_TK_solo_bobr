import { useEffect, useState } from "react";
import ArticleCard from "../../widgets/ArticleCard/ArticleCard";
import axiosInstance from "../../shared/lib/axiosInstance";
import type { ArticleType } from "../../entities/article/model";

export default function MyArticlePage() {
  const [myArticles, setMyArticles] = useState<ArticleType[]>([]);

  useEffect(() => {
    async function getMyArticles() {
      try {
        const response = await axiosInstance.get("api/articles/my");
        if (response.status === 200) setMyArticles(response.data.data);
      } catch (error) {
        console.log(error);
        alert("Ошибка при загрузке статей");
      }
    }
    getMyArticles();
  }, []);
  return (
    <div>
      {myArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
