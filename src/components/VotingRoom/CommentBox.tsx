import React, { useState, useRef, FormEvent } from "react";
import cn from "classnames";
import useDynamicHeightField from "./useDynamicHeightField";
import "./styles.module.css";
import { Input } from "@mui/joy";
import axios from "axios";

const INITIAL_HEIGHT = 46;

interface CommentBoxProps {
  selectedUserStoryId: number;
}

const CommentBox: React.FC<CommentBoxProps> = ({ selectedUserStoryId }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>("");
  const [score, setScore] = useState<string>("");

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
            {/* <img
              src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
              alt="User avatar"
            /> */}
            <Input
              placeholder="Enter Final Score"
              value={score}
              name="score"
              id="score"
              onChange={onChangeScore}
            ></Input>
          </div>
        </div>
        <label htmlFor="comment">What are your thoughts?</label>
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
        />
        <div className="actions">
          <button type="button" className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" disabled={commentValue.length < 1}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentBox;
