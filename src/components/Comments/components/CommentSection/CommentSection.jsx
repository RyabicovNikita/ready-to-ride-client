import { ParentComment } from "./components";

export const CommentSection = ({ user, created_at, text, childrenComments = [] }) => (
  <div class="media">
    <img class="mr-3 rounded-circle" alt="Bootstrap Media Preview" src="https://i.imgur.com/stD0Q19.jpg" />
    <div class="media-body">
      <div class="row">
        <div class="col-8 d-flex">
          <h5>{user.name}</h5>
          <span>{created_at}</span>
        </div>

        <div class="col-4">
          <div class="pull-right reply">
            <a href="#">
              <span>
                <i class="bi bi-arrow-90deg-down"></i>
              </span>
            </a>
          </div>
        </div>
      </div>

      {text}
      {childrenComments.map(({ id, created_at, user, text }) => (
        <ParentComment created_at={created_at} user={user} key={id}>
          {text}
        </ParentComment>
      ))}
    </div>
  </div>
);
