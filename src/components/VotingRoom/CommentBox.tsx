import React, { useState, useRef, FormEvent } from "react";
import cn from "classnames";
import useDynamicHeightField from "./useDynamicHeightField";
import "./styles.css";

const INITIAL_HEIGHT = 46;

interface CommentBoxProps {}

const CommentBox: React.FC<CommentBoxProps> = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>("");

  const outerHeight = useRef<number>(INITIAL_HEIGHT);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLFormElement>(null);
  useDynamicHeightField(textRef, commentValue);

  const onExpand = () => {
    if (!isExpanded) {
      outerHeight.current = containerRef.current?.scrollHeight || INITIAL_HEIGHT;
      setIsExpanded(true);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  const onClose = () => {
    setCommentValue("");
    setIsExpanded(false);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("send the form data somewhere");
  };

  return (
    <div className="container">
      <form
        onSubmit={onSubmit}
        ref={containerRef}
        className={cn("comment-box", {
          expanded: isExpanded,
          collapsed: !isExpanded,
          modified: commentValue.length > 0
        })}
        style={{
          minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT
        }}
      >
        <div className="header">
          <div className="user">
            <img
              src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
              alt="User avatar"
            />
            <span>User Name</span>
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
            Respond
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentBox;
