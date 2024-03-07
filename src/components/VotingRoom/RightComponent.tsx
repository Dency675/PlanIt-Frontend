import React from "react";
import Result from "./Result";
import { ResultTablePropType } from "./types";

const RightComponent: React.FC<ResultTablePropType> = ({
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
