import React from "react";
import { ClipLoader, ClipLoaderProps } from "react-spinners";

interface LoaderProps extends ClipLoaderProps {
  isLoading: boolean;
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({
  isLoading,
  size = 40,
  color = "#3498db",
  ...props
}) => {
  return (
    <>{isLoading && <ClipLoader size={size} color={color} {...props} />}</>
  );
};

export default Loader;
