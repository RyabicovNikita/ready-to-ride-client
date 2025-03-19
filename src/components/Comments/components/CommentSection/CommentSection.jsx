import { ParentComment } from "./components";

export const CommentSection = ({ user, created_at, text, parentComments = [] }) => <div class="media">
    <img class="mr-3 rounded-circle" alt="Bootstrap Media Preview" src="https://i.imgur.com/stD0Q19.jpg" />
    <div class="media-body">
        <div class="row">
            <div class="col-8 d-flex">
                <h5>{user.name}</h5>
                <span>{created_at}</span>
            </div>

            <div class="col-4">

                <div class="pull-right reply">

                    <a href="#"><span><i class="fa fa-reply"></i> Ответить</span></a>

                </div>

            </div>
        </div>

        {text}
        {parentComments.map(({ id, created_at, user }) => <ParentComment created_at={created_at} user={user} key={id}>{commentData.text}</ParentComment>)}
    </div>
</div>