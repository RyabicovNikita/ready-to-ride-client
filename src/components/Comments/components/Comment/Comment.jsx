import "./Comment.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../store";
import { mergeStringsBySpace } from "../../../../formatters/formatString";

export const Comment = ({ id: commentID, created_at, user, children: text }) => {
  const { id: userID } = useSelector(selectUser);
  console.log(created_at);
  return (
    <div className="comment mb-3">
      <div className="comment__content">
        <img class="comment__icon" alt="Bootstrap Media Preview" src="https://i.imgur.com/stD0Q19.jpg" />
        <div className="comment__message">
          <div className="comment__message-whenSend">
            <span>{mergeStringsBySpace([created_at.date, created_at.time])}</span>
          </div>
          <div className="comment__message-text">{text}</div>
        </div>
      </div>
    </div>
  );
};
