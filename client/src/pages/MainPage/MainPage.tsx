// src/pages/MainPage.tsx
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MainPage.css";
import axiosInstance from "../../shared/lib/axiosInstance";


const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [error, setError] = useState("");


  const handleSearch = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Тут будет вызов GigaChat
      // const response = await mockAICall(searchQuery);
      const band = searchQuery.trim();
      const response = await axiosInstance.post("/api/ai/aireq", { band });
      console.log("++++++++++++++++++++++++++++", response.data.data);
      setAiResponse(response.data.data);
    } catch (err) {
      console.log(err);
      setError("Что-то пошло не так. Попробуй еще раз");
    } finally {
      setLoading(false);
      setSearchQuery("");
    }
  };

  return (
    <div className="min-vh-100 bg-light ">
      {/* Основной контент */}
      <Container className="py-5">
        {/* Заголовок и описание */}
        <Row className="mb-5 text-center text-white">
          <Col lg={8} className="mx-auto">
            <h1 className=" lead text-secondary display-4 fw-bold mb-3">
              Погрузись в мир рока
            </h1>
            <p className="lead text-secondary">
              Узнай историю культовых групп, смысл легендарных песен и
              интересные факты
            </p>
          </Col>
        </Row>

        {/* Поисковая строка */}
        <Row className="mb-5">
          <Col md={8} lg={6} className="mx-auto">
            <Form onSubmit={handleSearch} className="d-flex gap-2">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Например: Nirvana, Metallica, Кино, Rammstein..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-secondary text-white border-secondary"
              />
              <Button
                variant="danger"
                size="lg"
                type="submit"
                disabled={loading || !searchQuery.trim()}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Найти"}
              </Button>
            </Form>

            {/* Быстрые подсказки */}
            <div className="mt-3 d-flex gap-2 flex-wrap justify-content-center">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setSearchQuery("Nirvana")}
              >
                Nirvana
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setSearchQuery("Metallica")}
              >
                Metallica
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setSearchQuery("Rammstein")}
              >
                Rammstein
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setSearchQuery("Кино")}
              >
                Кино
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setSearchQuery("Offspring")}
              >
                Offspring
              </Button>
            </div>
          </Col>
        </Row>

        {/* Ошибка */}
        {error && (
          <Row className="mb-4">
            <Col md={8} lg={6} className="mx-auto">
              <Alert variant="danger">{error}</Alert>
            </Col>
          </Row>
        )}

        {/* Результат от AI */}
        {aiResponse && !loading && (
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="bg-light text-black border-secondary">
                <Card.Body>
                  {/* Основная информация */}
                  <Row className="mb-3">
                    <p className="lead mb-3">{aiResponse}</p>
                  </Row>

                  {/* Кнопки действий */}
                  <div className="gap-2">
                    <Button onClick={() => window.open("https://maximum.ru/", "_blank")} variant="outline-info"  size="sm">
                      Или просто послушать 🤟MAXIMUM🤟
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Заглушка для первого посещения */}
        {!aiResponse && !loading && !error && (
          <Row className="text-center">
            <Col md={8} lg={6} className="mx-auto">
              <div className="bg-dark border border-secondary rounded p-5">
                <span className="display-1 mb-3 d-block">🎸</span>
                <h3 className="text-white mb-3">Что хочешь узнать?</h3>
                <p className="text-white mb-0">
                  Напиши название группы или песни в поиске,
                  <br />и AI-гид расскажет их историю
                </p>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default MainPage;
