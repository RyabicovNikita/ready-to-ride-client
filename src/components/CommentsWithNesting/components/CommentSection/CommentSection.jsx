import { mergeStringsBySpace } from "../../../../formatters/formatString";
import { ParentComment } from "./components";

export const CommentSection = ({ userName, created_at, text, childrenComments = [] }) => (
  <div class="media mb-3">
    <img class="mr-3 rounded-circle" alt="Bootstrap Media Preview" src="https://i.imgur.com/stD0Q19.jpg" />
    <div class="media-body">
      <div class="row">
        <div class="col-10 d-flex gap-3">
          <h5>{userName}</h5>
          <span>{mergeStringsBySpace([created_at.date, created_at.time])}</span>
        </div>

        <div class="col-2">
          <div class="pull-right reply">
            <div className="d-flex gap-3">
              <i class="bi bi-arrow-90deg-down"></i>
              <i class="bi bi-trash"></i>
            </div>
          </div>
        </div>
      </div>
      {text}
      {childrenComments.map(({ id, created_at, userName, text }) => (
        <ParentComment created_at={created_at} userName={userName} key={id}>
          {text}
        </ParentComment>
      ))}
    </div>
  </div>
);
