import * as React from "react";

type LoadingSpinnerProps = {
  classNames?: string;
};

export const LoadingSpinner = ({ classNames }: LoadingSpinnerProps) => {
  return (
    <div
      className={`${`pointer-events-none h-10 w-10 animate-loading-spin rounded-full border-4 border-solid border-secondary border-t-foreground`} ${`${
        classNames ?? ""
      }`}`}
    ></div>
  );
};
