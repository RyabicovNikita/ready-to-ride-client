import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardGroup,
  FloatingLabel,
  Form,
  FormGroup,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useCallback, useContext, useEffect, useState } from "react";
import { USER_PROPS } from "../../constants";
import {
  logoutUserIfTokenExpired,
  renderError,
  userShapeObject,
} from "../../utils";
import { getError } from "../../utils/yup";
import { FileUpload, Loader, MgContainer } from "../../components";
import { useError, useLoader } from "../../hooks";
import { useDispatch } from "react-redux";
import "./UserAccount.scss";
import defaultUserIcon from "../../images/ghost.png";
import { RemoveIcon } from "../../icons/Remove";
import { getUser, updateUser } from "../../api";
import { useNavigate, useParams } from "react-router";
import { AuthModalContext } from "../../context";
import { mapDateToFormat } from "./../../mappers/mapDate";
import { getFullImageURL } from "../../mappers";
import { setUser } from "../../store";

export const UserAccount = () => {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { error, handleError, resetError } = useError();
  const navigate = useNavigate();
  const { authModalView } = useContext(AuthModalContext);
  const [imageUrl, setImageUrl] = useState(null);

  const { loading, showLoader, hideLoader } = useLoader();

  const formSchema = yup.object().shape(userShapeObject);

  const formParams = {
    defaulValues: {},
    resolver: yupResolver(formSchema),
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm(formParams);

  const checkTokenExpired = useCallback(
    (error) =>
      logoutUserIfTokenExpired({
        error,
        handleError,
        dispatch,
        navigate,
        authModalView,
        resetError,
      }),
    []
  );
  const updateFields = (fields) =>
    fields.forEach((field) => {
      if (field) setValue(field.name, field.value);
    });

  const onSubmit = async ({
    firstName,
    lastName,
    birthday = null,
    driverAuto,
  }) => {
    if (!isEdit) {
      setIsEdit(true);
      return;
    }
    showLoader();
    if (driverAuto === '{"{\\"null\\"}"}') driverAuto = "";
    const formData = new FormData();
    // Добавляем текстовые поля
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("birthday", mapDateToFormat(birthday, "yyyy-MM-dd"));
    formData.append("driverAuto", driverAuto);
    formData.append("imageFile", file || "");

    const res = await updateUser(id, formData);

    if (res.error) {
      checkTokenExpired(res.error);
      return;
    }
    const updateData = res.body;
    dispatch(setUser(updateData));
    updateFields(
      Object.values(USER_PROPS).map((name) => ({
        name: name,
        value: updateData[name] ?? null,
      }))
    );
    setIsEdit(false);
    hideLoader();
  };

  useEffect(() => {
    showLoader();
    getUser(id).then((res) => {
      if (res.error) {
        checkTokenExpired(res.error);
        return;
      }
      const userData = res.body;
      setImageUrl(userData.imageUrl);
      dispatch(setUser(userData));
      updateFields(
        Object.values(USER_PROPS).map((name) => ({
          name: name,
          value: userData[name] ?? null,
        }))
      );
      hideLoader();
    });
  }, []);

  useEffect(() => {
    handleError(errors);
  }, [errors]);

  const getRegProps = (propName) => ({
    ...register(propName, {
      onChange: () => resetError(),
    }),
  });

  const getErrorByProp = useCallback(
    (propName) => getError(propName, errors),
    [errors]
  );

  const handleRemoveFile = (e) => {
    e.stopPropagation(); // Предотвращаем всплытие события клика
    setFile(null);
    setImageUrl(null);
  };

  return (
    <>
      {loading && <Loader />}
      <MgContainer>
        {renderError(error)}
        <Form
          className="account-form needs-validation mt-5"
          onSubmit={handleSubmit(onSubmit)}
          novalidate
        >
          <div className="d-flex align-items-center gap-3 mb-3">
            <div className="file-preview">
              <img
                src={
                  imageUrl
                    ? getFullImageURL(imageUrl)
                    : file
                    ? URL.createObjectURL(file)
                    : defaultUserIcon
                }
                alt="Preview"
                className="preview-image"
              />
              {(imageUrl || file) && isEdit && (
                <div className="remove-button" onClick={handleRemoveFile}>
                  <RemoveIcon />
                </div>
              )}
            </div>
            <div className="gap-2">
              <FloatingLabel label="Имя">
                <Form.Control
                  name={USER_PROPS.NAME}
                  placeholder="Иван"
                  disabled={!isEdit}
                  className={`mb-3 ${
                    getErrorByProp(USER_PROPS.NAME) ? "is-invalid" : ""
                  }`}
                  {...getRegProps(USER_PROPS.NAME)}
                />
              </FloatingLabel>
              <FloatingLabel label="Фамилия">
                <Form.Control
                  name={USER_PROPS.SURNAME}
                  placeholder="Иванов"
                  disabled={!isEdit}
                  className={`mb-3 ${
                    getErrorByProp(USER_PROPS.SURNAME) ? "is-invalid" : ""
                  }`}
                  {...getRegProps(USER_PROPS.SURNAME)}
                />
              </FloatingLabel>
            </div>
          </div>
          <CardGroup className="gap-2">
            <FloatingLabel label="Дата рождения">
              <Form.Control
                name={USER_PROPS.BIRTHDAY}
                placeholder="Иванов"
                disabled={!isEdit}
                type="date"
                {...getRegProps(USER_PROPS.BIRTHDAY)}
              />
            </FloatingLabel>
            <FloatingLabel label="Email">
              <Form.Control
                name={USER_PROPS.EMAIL}
                disabled={true}
                className={`mb-3 ${
                  getErrorByProp(USER_PROPS.EMAIL) ? "is-invalid" : ""
                }`}
                type="email"
                {...getRegProps(USER_PROPS.EMAIL)}
              />
            </FloatingLabel>
          </CardGroup>
          {isEdit && <FileUpload setFile={setFile} />}
          <Button className={isEdit ? "btn btn-dark" : "btn"} type="submit">
            {isEdit ? "Сохранить" : "Редактировать"}
          </Button>
        </Form>
      </MgContainer>
    </>
  );
};
