import { useSelector } from "react-redux";
import "./Comments.scss";

import { Comment } from "./components";
import { selectTrip } from "../../store";

export const Comments = () => {
  const { comments } = useSelector(selectTrip);
  return (
    <div className="comments__scrollable">
      {comments.map(({ id, created_at, user, text }) => (
        <Comment id={id} created_at={created_at} user={user} key={id}>
          {text}
        </Comment>
      ))}
    </div>
  );
};
