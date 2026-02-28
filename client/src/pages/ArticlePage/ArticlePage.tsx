import { useEffect, useState } from "react";
import ArticleCard from "../../widgets/ArticleCard/ArticleCard";
import ArticleAddForm from "../../widgets/ArticleAddForm/ArticleAddForm";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import axiosInstance from "../../shared/lib/axiosInstance";
import Loader from "../../shared/hoocs/Loader/Loader";
import { useAppSelector } from "../../shared/hoocs/useReduxHooks/useReduxHooks";
import type { ArticleType } from "../../entities/article/model/index";

export default function ArticlePage() {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [showForm, setShowForm] = useState(false);

  const userState = useAppSelector((state) => state.user);
  const { user, isInitialized } = userState;
  console.log("=============articlePage============", user);

  const submitHandler = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const targetData = event.target;
      const dataForApi = Object.fromEntries(new FormData(targetData));
      if (!dataForApi.title || !dataForApi.content)
        return alert("Заполните все поля");
      const response = await axiosInstance.post("/api/articles", dataForApi);

      if (response.status === 201) {
        setArticles((prev) => [response.data.data, ...prev]); // первая data - это ключ в response от axios, вторая data  - ключ от formatResponse
        targetData.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getArticles() {
      try {
        const response = await axiosInstance.get("/api/articles");
        setArticles(response.data.data);
      } catch (error) {
        console.log(error);
        alert("Ошибка загрузки статей. Проверьте подключение к сети.");
      }
    }
    getArticles();
  }, []);

  return (
    <Loader isLoading={!articles}>
      <div className="container">
        <br />
        <Row>
          {isInitialized && (
            <Button
              variant={showForm ? "primary-outline" : "primary-outline"}
              onClick={() => setShowForm((prev) => !prev)}
            >
              {showForm ? "Закрыть форму" : "Добавить статью"}
            </Button>
          )}

          <br />
          {showForm && <ArticleAddForm submitHandler={submitHandler} />}
        </Row>
        {!articles && !showForm && <h2>Нет статей</h2>}
        <br />
        <Row>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </Row>
      </div>
    </Loader>
  );
}
