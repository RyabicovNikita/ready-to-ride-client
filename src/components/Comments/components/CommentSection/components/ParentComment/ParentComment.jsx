export const ParentComment = ({ userName, created_at, children }) => (
  <div class="media mt-4">
    <a class="pr-3" href="#">
      <img class="rounded-circle" alt="Bootstrap Media Another Preview" src="https://i.imgur.com/xELPaag.jpg" />
    </a>
    <div class="media-body">
      <div class="row">
        <div class="col-12 d-flex">
          <h5>{userName}</h5>
          <span>{created_at}</span>
        </div>
      </div>
      {children}
    </div>
  </div>
);
