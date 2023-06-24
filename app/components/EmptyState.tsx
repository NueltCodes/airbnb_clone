"use client";

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";
import useLoginModal from "../hooks/useLoginModal";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  login?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
  login,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
        {login && <Button outline label="Login" onClick={loginModal.onOpen} />}
      </div>
    </div>
  );
};

export default EmptyState;
