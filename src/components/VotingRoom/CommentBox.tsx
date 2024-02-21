import React, { useState, useRef, FormEvent } from "react";
import cn from "classnames";
import useDynamicHeightField from "./useDynamicHeightField";
import "./styles.module.css";
import { Input } from "@mui/joy";
import axios from "axios";
import { width } from "@mui/system";
import Textarea from "@mui/joy/Textarea";

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

  const outerHeight = useRef<number>(INITIAL_HEIGHT);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLFormElement>(null);
  useDynamicHeightField(textRef, commentValue);

  const onExpand = () => {
    if (!isExpanded) {
      outerHeight.current =
        containerRef.current?.scrollHeight || INITIAL_HEIGHT;
      setIsExpanded(true);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  const onChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScore(e.target.value);
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

    try {
      // Make a POST request to your endpoint with the form data
      const response = await axios.post(
        "http://localhost:3001/addUserStoriesAndSessionMapping",
        data
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

  return (
    <div className="container">
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
        <div className="header">
          <div className="user">
            <Input
              placeholder="Enter Final Score"
              value={score}
              name="score"
              id="score"
              sx={{ top: "20px" }}
              onChange={onChangeScore}
            ></Input>
          </div>
        </div>
        <textarea
          ref={textRef}
          onClick={onExpand}
          onFocus={onExpand}
          onChange={onChange}
          className="comment-field"
          placeholder="What are your thoughts?"
          value={commentValue}
          name="comment"
          id="comment"
          style={{
            marginTop: "30px",
            width: "100%",
            borderRadius: "5px",
            resize: "none",
            borderColor: "#cdd7e1",
            padding: "5px",
            fontSize: "16px",
          }}
        />
        <div className="actions"></div>
      </form>
    </div>
  );
};

export default CommentBox;
