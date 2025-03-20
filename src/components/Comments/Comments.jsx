import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FloatingLabel, Form } from "react-bootstrap";
import "./Comments.scss";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { getError } from "../../utils/yup";
import { renderError } from "../../utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../store";
import { addParentCommentInTrip } from "../../api/comment";
import { useError } from "../../hooks";
export const Comments = ({ tripID }) => {
  const { id: userID } = useSelector(selectUser);
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
    const res = await addParentCommentInTrip(9, userID, comment);
    if (res.error) {
      handleError(res.error);
      return;
    }
    reset();
    resetError();
  };
  return (
    <div class="comments container mb-5 mt-5">
      <div class="card">
        <div class="row">
          <div class="col-md-12">
            <h3 class="text-center mb-5">Комментарии</h3>
            {renderError(commentError || error)}
            <Form className="mt-4 newComment d-flex gap-3" onSubmit={handleSubmit(onSubmit)}>
              <FloatingLabel controlId="floatingInput" label="Новый комментарий" className="w-100">
                <textarea
                  name="comment"
                  class="form-control"
                  placeholder="Password"
                  {...register("comment", {
                    onChange: reset,
                  })}
                />
              </FloatingLabel>
              <button className="mr-3 pointer d-flex align-items-center" type="submit">
                <i class="bi bi-send"></i>
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
