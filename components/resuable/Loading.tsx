import { cn } from "@/lib/utils";

type LoadingProps = {
  text?: string;
  fullScreen?: boolean;
  className?: string;
};

const Loading = ({
  text = "Loading...",
  fullScreen = false,
  className,
}: LoadingProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        fullScreen ? "min-h-screen bg-bg-main" : "py-10",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border-soft border-t-brand-primary" />

        <p className="text-sm font-medium text-text-muted">{text}</p>
      </div>
    </div>
  );
};

export default Loading;
