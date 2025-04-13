import React, { useRef, useState } from "react";
import "./FileUpload.scss";

export const FileUpload = ({ setFile }) => {
  const fileInputRef = useRef();
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Пожалуйста, выберите изображение.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      setError(null); // Сброс ошибки при успешном файле
    } else {
      setError("Пожалуйста, перетащите изображение.");
    }
  };

  const handleBlockClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="file-upload-container mb-3">
      <div
        className={`file-upload-box ${dragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBlockClick} // Клик по блоку для выбора файла
      >
        <h3 className="file-upload-title">Загрузите фотографию</h3>

        {/* Кнопка для выбора файла */}
        <input
          ref={fileInputRef}
          id="file-input"
          type="file"
          onChange={handleFileChange}
          className="file-input"
          accept="image/*" // Ограничиваем выбор изображениями
          style={{ display: "none" }} // Скрываем элемент input
        />
        <p className="file-upload-instruction">
          Перетащите или кликните на это окно и выберите файл.
        </p>

        {/* Если файл не соответствует типу, показываем ошибку */}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};
