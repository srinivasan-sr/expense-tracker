import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      Oops! An error has occurred.
      <p>
        <i>{error.statusText || error.statusMessage}</i>
      </p>
    </div>
  );
}
