// A plain reusable container. Any page can wrap content in <Card> to
// get consistent border/padding/spacing instead of repeating CSS.
export function Card({ children }) {
  return <div className="card">{children}</div>;
}
