import { Link } from "react-router";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import { Container } from "react-bootstrap";
import { ArrowRight } from "lucide-react";
import type { ArticleType } from "../../entities/article/model/index";

type ArticleCardProps = {
  article: ArticleType;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Container className="fluid rounded-3">
      <Col >
        <Card>
          <Card.Body>
            <Card.Title>
              {article.title}
              <Link
                to={`/onearticle/${article.id}`}
                style={{ float: "right", textDecoration: "none" }}
              >
                <ArrowRight />
              </Link>
            </Card.Title>
          </Card.Body>
        </Card>
        <br />
      </Col>
    </Container>
  );
}
