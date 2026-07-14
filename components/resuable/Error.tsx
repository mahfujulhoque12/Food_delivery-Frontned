import { FiAlertCircle } from "react-icons/fi";

type ErrorProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

const Error = ({
  title = "Something went wrong",
  message = "We couldn't load the requested data. Please try again.",
  onRetry,
}: ErrorProps) => {
  return (
    <div className="flex min-h-[300px] items-center justify-center px-4">
      <div className="max-w-md rounded-2xl border border-border-soft bg-bg-card p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <FiAlertCircle className="h-7 w-7 text-error" />
        </div>

        <h2 className="mt-5 text-xl font-semibold text-text-dark">{title}</h2>

        <p className="mt-2 text-sm leading-6 text-text-muted">{message}</p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-6 rounded-xl bg-btn-dark px-5 py-2.5 text-sm font-medium text-white transition hover:bg-btn-dark-hover"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;
