import React, { useState, useRef } from "react";
import cn from "classnames";
import { Input } from "@mui/joy";
import Textarea from "@mui/joy/Textarea";
import { useSocket } from "../Socket/SocketContext";
import { Container } from "@mui/joy";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import FormHelperText from "@mui/joy/FormHelperText";
import { CommentBoxProps } from "./types";
import updateUserStoryMapping from "./api/updateUserStoryMapping";

const INITIAL_HEIGHT = 46;

const CommentBox: React.FC<CommentBoxProps> = ({
  selectedUserStoryId,
  setCommentValue,
  setScore,
  commentValue,
  score,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isCommentBoxDisabled, setIsCommentBoxDisabled] =
    useState<boolean>(true);
  const [isCommentBoxValidated, setIsCommentBoxValidated] =
    useState<boolean>(false);
  const [isFinalScoreValidated, setIsFinalScoreValidated] =
    useState<boolean>(false);

  const socket = useSocket();

  const outerHeight = useRef<number>(INITIAL_HEIGHT);
  const containerRef = useRef<HTMLFormElement>(null);

  const onExpand = () => {
    if (!isExpanded) {
      outerHeight.current =
        containerRef.current?.scrollHeight || INITIAL_HEIGHT;
      setIsExpanded(true);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
    if (e.target.value !== "") setIsCommentBoxValidated(false);
  };

  const onChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScore(e.target.value);
    if (e.target.value !== "") setIsFinalScoreValidated(false);
  };

  const onClose = () => {
    setCommentValue("");
    setIsExpanded(false);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const { score, comment } = data;

    updateUserStoryMapping(
      selectedUserStoryId,
      comment as string,
      score as string,
      0
    )
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((error: any) => {
        console.error("Error submitting form:", error);
      });
  };

  React.useEffect(() => {
    socket.on("enableCommentBox", async (sessionId) => {
      setIsCommentBoxDisabled(false);
      setIsFinalScoreValidated(false);
      setIsCommentBoxValidated(false);
    });
    return () => {
      socket.off("enableCommentBox");
    };
  }, [socket]);

  React.useEffect(() => {
    socket.on("disableCommentBox", async (sessionId) => {
      setIsCommentBoxDisabled(true);
      setScore("");
      setCommentValue("");
    });
    return () => {
      socket.off("disableCommentBox");
    };
  }, [socket]);

  React.useEffect(() => {
    socket.on("commentBoxValidation", async (sessionId) => {
      if (score === "") setIsFinalScoreValidated(true);
      else setIsFinalScoreValidated(false);
      if (commentValue === "") setIsCommentBoxValidated(true);
      else setIsCommentBoxValidated(false);
    });
    return () => {
      socket.off("commentBoxValidation");
    };
  }, [score, commentValue]);

  return (
    <Container>
      <form
        onSubmit={onSubmit}
        ref={containerRef}
        className={cn("comment-box", {
          expanded: isExpanded,
          collapsed: !isExpanded,
          modified: commentValue.length > 0,
        })}
        style={{
          minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT,
        }}
      >
        <Input
          placeholder="Enter Final Score"
          value={score}
          name="score"
          id="score"
          sx={{
            top: "20px",
            width: "100%",
            borderRadius: "5px",
            resize: "none",
            borderColor: "#cdd7e1",
            padding: "5px",
            fontSize: "16px",
          }}
          onChange={onChangeScore}
          required
          disabled={isCommentBoxDisabled}
          error={isFinalScoreValidated}
        ></Input>
        {isFinalScoreValidated && !isCommentBoxDisabled && (
          <FormHelperText
            sx={{
              marginTop: "25px",
              color: "#d97475",
            }}
          >
            <InfoOutlined />
            Final Score is missing.
          </FormHelperText>
        )}

        <Textarea
          onClick={onExpand}
          onFocus={onExpand}
          onChange={onChange}
          placeholder="What are your thoughts?"
          value={commentValue}
          disabled={isCommentBoxDisabled}
          sx={{
            marginTop: "30px",
            width: "100%",
            borderRadius: "5px",
            resize: "none",
            borderColor: "#cdd7e1",
            padding: "5px",
            fontSize: "16px",
          }}
          error={isCommentBoxValidated}
        />
        {isCommentBoxValidated && !isCommentBoxDisabled && (
          <FormHelperText
            sx={{
              marginTop: "25px",
              color: "#d97475",
            }}
          >
            <InfoOutlined />
            Comment is missing.
          </FormHelperText>
        )}
      </form>
    </Container>
  );
};

export default CommentBox;
