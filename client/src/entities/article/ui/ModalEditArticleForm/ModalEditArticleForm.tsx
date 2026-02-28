import { CirclePlus, CircleX } from "lucide-react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import type { ArticleType } from "../../model/index";

type ModalEditoneArticleFormProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  oneArticle: ArticleType;
  updateHandler: (event: React.SubmitEvent<HTMLFormElement>) => void;
};

export default function ModalEditoneArticleForm({
  show,
  setShow,
  oneArticle,
  updateHandler,
}: ModalEditoneArticleFormProps) {
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Изменение подарка</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Title"
                defaultValue={oneArticle.title}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Содержание</Form.Label>
              <Form.Control
                type="text"
                name="content"
                placeholder="Content"
                defaultValue={oneArticle.content}
              />
            </Form.Group>
            <ButtonGroup>
              <Button variant="secondary" onClick={() => setShow(false)}>
                <CircleX />
              </Button>
              <Button variant="secondary" type="submit">
                <CirclePlus />
              </Button>
            </ButtonGroup>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
