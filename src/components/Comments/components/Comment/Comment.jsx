import "./Comment.scss";
import { mergeStringsBySpace } from "../../../../formatters/formatString";
import defaultUserIcon from "../../../../images/ghost.png";
export const Comment = ({ created_at, user, children: text }) => {

  return (
    <div className="comment mb-3">
      <div className="comment__content" style={{ justifyContent: user.isDriver ? "flex-end" : "flex-start" }}>
        <img class="comment__icon" alt="Bootstrap Media Preview" src={user.imageUrl || defaultUserIcon} />
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
