import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

type Props = {
  children: React.ReactNode;
  isLoading: boolean;
};

export default function Loader({ children, isLoading }: Props) {
  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Ring size={250} speed={1.5} bgOpacity={0.25} color={"rgb(76, 76, 76)"} />;
      </div>
    );
  }
  return children;
}
