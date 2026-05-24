import { Spinner } from "@heroui/react";

const Loading = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center w-full">
      <Spinner size="lg" color="primary" label="Loading..." />
    </div>
  );
};

export default Loading;