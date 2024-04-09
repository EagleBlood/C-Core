import { useRouteError } from "react-router-dom";
import { ErrorPageProps } from "./errorPage.props";
import { Wrapper } from './errorPage.style';
import { FunctionComponent } from "react";

interface RouteError extends Error {
    status?: number;
    statusText?: string;
}

const ErrorPage: FunctionComponent<ErrorPageProps> = ({}) => {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <Wrapper>
        <div className="errorContainer">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.status}: {error.statusText || error.message}</i>
            </p>
        </div>
    </Wrapper>
  );
}

export default ErrorPage;