import { useSelector } from "react-redux";
import "./Comments.scss";

import { Comment } from "./components";
import { selectTrip } from "../../store";

export const Comments = ({ commentsAvailable, commentScrollRef }) => {
  const { comments } = useSelector(selectTrip);

  return (
    <div className="comments__scrollable" style={{ maxHeight: commentsAvailable ? "80%" : "100%" }}>
      {comments.map(({ id, created_at, user, text }) => (
        <Comment created_at={created_at} user={user} key={id}>
          {text}
        </Comment>
      ))}
      <div ref={commentScrollRef}></div>
    </div>
  );
};
