import Container from "react-bootstrap/esm/Container";

export default function Footer() {
  return (
    <div>
      <footer className="bg-ligth text-secondary py-4 border-top border-secondary">
        <Container className="text-center">
          <p className="mb-0">
            Rock Storyteller © 2026 | Создано как то 😂
          </p>
        </Container>
      </footer>
    </div>
  );
}
