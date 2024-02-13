import React from "react";
import Result from "./Result";
interface tablePropType {
  sessionId: string;
}

const RightComponent: React.FC<tablePropType> = ({ sessionId }) => {
  return (
    <div>
      <Result sessionId={sessionId} />
    </div>
  );
};

export default RightComponent;
