import React from "react";
import Result from "./Result";
interface tablePropType {
  sessionId: string;
  currentUserStoryId: number;
}

const RightComponent: React.FC<tablePropType> = ({
  sessionId,
  currentUserStoryId,
}) => {
  return (
    <div>
      <Result sessionId={sessionId} currentUserStoryId={currentUserStoryId} />
    </div>
  );
};

export default RightComponent;
