import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { useNavigate, useParams } from "react-router";

type submitHandlerProps = {
  submitHandler: (event: React.SubmitEvent<HTMLFormElement>) => void;
};

export default function ArticleAddForm({ submitHandler }: submitHandlerProps) {
  // const params = useParams();
  // const navigate = useNavigate();
  // const { articleId } = params;

  return (
    <Form onSubmit={submitHandler}>
      <Form.Control type="text" placeholder="Название" name="title" />
      <br />
      <Form.Control type="text" placeholder="Содержание" name="content" />
      <br />
      <Button variant="secondary" type="submit">
        Добавить
      </Button>
    </Form>
  );
}
