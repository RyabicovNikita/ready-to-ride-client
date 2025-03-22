import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FloatingLabel, Form } from "react-bootstrap";
import "./Comments.scss";
import { useForm } from "react-hook-form";
import { useContext, useMemo } from "react";
import { getError } from "../../utils/yup";
import { logoutUserIfTokenExpired, renderError } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { redAddComment, selectTrip, selectUser } from "../../store";
import { addParentCommentInTrip } from "../../api/comment";
import { useError } from "../../hooks";
import { CommentSection } from "./components";
import { useNavigate } from "react-router";
import { AuthModalContext } from "../../context";
import { mergeStringsBySpace } from "../../formatters/formatString";
export const CommentsWihNesting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authModalView } = useContext(AuthModalContext);
  const { id: userID } = useSelector(selectUser);
  const { id: tripID, comments } = useSelector(selectTrip);
  const { handleError, error, resetError } = useError();
  const shapeObject = {
    comment: yup.string().required("Введите комментарий").max(10000, "Комментарий не может превышать 10 тысяч символов"),
  };

  const formSchema = yup.object().shape(shapeObject);

  const formParams = {
    defaulValues: {},
    resolver: yupResolver(formSchema),
  };
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm(formParams);

  const commentError = useMemo(() => getError("comment", errors), [errors]);

  const onSubmit = async ({ comment }) => {
    const res = await addParentCommentInTrip(tripID, userID, comment);
    reset();
    resetError();
    if (res.error) {
      logoutUserIfTokenExpired({
        error: res.error,
        authModalView: authModalView,
        handleError: handleError,
        dispatch: dispatch,
        navigate: navigate,
        resetError: resetError,
      });
      return;
    }
    dispatch(redAddComment(res.body));
  };

  return (
    <div class="comments container mb-5 mt-5">
      <div>
        <div class="row">
          <div class="col-md-12">
            <h3 class="text-center mb-5">Комментарии</h3>
            <div className="comments__content">
              {comments.map(({ id, text, created_at, user }) => (
                <CommentSection
                  text={text}
                  created_at={mergeStringsBySpace([created_at.date, created_at.time])}
                  userName={mergeStringsBySpace([user?.firstName, user?.lastName])}
                  childrenComments={comments.filter((i) => i.parent === id)}
                  key={id}
                />
              ))}
            </div>

            <Form className="mt-4 mb-4 newComment d-flex gap-3" onSubmit={handleSubmit(onSubmit)}>
              <FloatingLabel controlId="floatingInput" label="Новый комментарий" className="w-100">
                <textarea
                  name="comment"
                  className="comment"
                  class="form-control"
                  placeholder="Password"
                  {...register("comment", {
                    onChange: () => resetError(),
                  })}
                />
              </FloatingLabel>
              <div className="d-flex align-items-center">
                <button className="comments__send mr-3 d-flex align-items-center" type="submit">
                  <i class="bi bi-send"></i>
                </button>
              </div>
            </Form>
            {renderError(commentError || error)}
          </div>
        </div>
      </div>
    </div>
  );
};
