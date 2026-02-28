import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ModalEditArticleForm from "../../entities/article/ui/ModalEditArticleForm/ModalEditArticleForm";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import { ArrowLeft, Pen, Trash } from "lucide-react";
import axiosInstance from "../../shared/lib/axiosInstance";
import type { ArticleType } from "../../entities/article/model/index";
import { useAppSelector } from "../../shared/hoocs/useReduxHooks/useReduxHooks";

export default function OneArticlePage() {
  const [oneArticle, setArticle] = useState<ArticleType>({
    id: 0,
    title: "",
    content: "",
    userId: 0,
  });
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { articleId } = params;

  const { user, isInitialized } = useAppSelector((state) => state.user);
  console.log(user);

  const deleteHandler = async () => {
    try {
      const response = await axiosInstance.delete(`/api/articles/${articleId}`);
      if (response.status === 204) navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const targetData = event.target;
      const dataForApi = Object.fromEntries(new FormData(targetData));
      if (!dataForApi.title || !dataForApi.content)
        return alert("Заполните все поля");
      const response = await axiosInstance.put(
        `/api/articles/${articleId}`,
        dataForApi,
      );
      if (response.status === 200) {
        setArticle(response.data.data);
        setShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch(import.meta.env.VITE_API + `/articles/${articleId}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.statusCode === 200) setArticle(data.data);
  //       })
  //       .catch(console.log);

  useEffect(() => {
    const fetchArticle = async (): Promise<void> => {
      try {
        const res = await axiosInstance(`/api/articles/${articleId}`);
        if (res.status === 200) setArticle(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticle();
  }, [articleId]);
  return (
    <>
      <ModalEditArticleForm
        show={show}
        setShow={setShow}
        oneArticle={oneArticle}
        updateHandler={updateHandler}
      />
      <Card style={{ margin: "5px auto", padding: "10px" }}>
        <Card.Body>
          <Card.Title>{oneArticle.title}</Card.Title>
          <Card.Text>{oneArticle.content}</Card.Text>
          <ButtonGroup>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              <ArrowLeft /> Назад
            </Button>
            {isInitialized &&
              user &&
              user.id === oneArticle.userId && (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => setShow((prev) => !prev)}
                  >
                    <Pen /> Изменить
                  </Button>
                  <Button variant="danger" onClick={deleteHandler}>
                    <Trash /> Удалить
                  </Button>
                </>
              )}
          </ButtonGroup>
        </Card.Body>
      </Card>
    </>
  );
}
