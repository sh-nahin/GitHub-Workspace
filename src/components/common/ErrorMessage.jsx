export function ErrorMessage({ message }) {
  return <p className="form-error">{message || 'Something went wrong.'}</p>;
}
