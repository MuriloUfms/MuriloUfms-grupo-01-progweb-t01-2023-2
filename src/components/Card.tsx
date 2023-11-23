import "./Card.css";

interface CardProps {
  image_url: string;
}

export function Card(props: CardProps) {
  return (
    <div className="card">
      <img src={props.image_url} />
    </div>
  );
}
