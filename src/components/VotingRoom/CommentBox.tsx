import React, { useState, useRef, FormEvent } from "react";
import cn from "classnames";
import useDynamicHeightField from "./useDynamicHeightField";
import "./styles.module.css";
import { Input } from "@mui/joy";
import axios from "axios";
import { width } from "@mui/system";
import Textarea from "@mui/joy/Textarea";
import { useSocket } from "../Socket/SocketContext";
import { Box, Container, Grid } from "@mui/joy";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import FormHelperText from "@mui/joy/FormHelperText";
import FormControl from "@mui/joy/FormControl";

const INITIAL_HEIGHT = 46;

interface CommentBoxProps {
  selectedUserStoryId: number;
  setScore: React.Dispatch<React.SetStateAction<string>>;
  setCommentValue: React.Dispatch<React.SetStateAction<string>>;
  commentValue: string;
  score: string;
}

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

  React.useEffect(() => {
    console.log("isCommentBoxValidated", isCommentBoxValidated);
  }, [isCommentBoxValidated]);
  React.useEffect(() => {
    console.log("isFinalScoreValidated", isFinalScoreValidated);
  }, [isCommentBoxValidated]);
  React.useEffect(() => {
    console.log("score", score);
  }, [score]);

  const socket = useSocket();

  const outerHeight = useRef<number>(INITIAL_HEIGHT);
  // const textRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLFormElement>(null);
  // useDynamicHeightField(textRef, commentValue);

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
    console.log(e.target.value);
    if (e.target.value !== "") setIsFinalScoreValidated(false);
  };

  const onClose = () => {
    setCommentValue("");
    setIsExpanded(false);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(event.target); // Capture the form data
    const data = Object.fromEntries(formData); // Convert the FormData object to a plain object
    console.log(data);
    const { score, comment } = data;

    console.log(selectedUserStoryId);

    try {
      // Make a POST request to your endpoint with the form data
      const response = await axios.put(
        "http://localhost:3001/updateUserStorySessionMapping",
        {
          userStorySessionMappingId: selectedUserStoryId,
          comment: comment,
          storyPointResult: score,
        }
      );

      // Handle the response
      console.log(response.data); // Log the response data
      // You can also perform any other actions based on the response, such as showing a success message or redirecting the user
    } catch (error) {
      // Handle errors
      console.error("Error submitting form:", error);
      // You can display an error message to the user or perform any other error handling logic
    }
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
    console.log("score", score);
    socket.on("commentBoxValidation", async (sessionId) => {
      console.log(score);
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
            Opps! something is wrong.
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
            Opps! something is wrong.
          </FormHelperText>
        )}
      </form>
    </Container>
  );
};

export default CommentBox;
