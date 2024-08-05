// ImagePicker.js
import  { useState } from 'react';
import styled from 'styled-components';

const ImagePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const ImagePreview = styled.div`
  width: 150px;
  height: 150px;
  border: 2px dashed #ddd;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: #f8f8f8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;
  type:"button";

  &:hover {
    background-color: #0056b3;
  }
`;

const ImagePicker = ({ onImageSelect }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result,"from image picker");

        onImageSelect(reader.result); // Pass the image path to the parent component
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ImagePickerContainer>
      <ImagePreview onClick={() => document.getElementById('fileInput').click()}>
        {image ? <img src={image} alt="Preview" /> : 'Click to upload'}
      </ImagePreview>
      <HiddenFileInput
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <UploadButton type='button' onClick={() => document.getElementById('fileInput').click()}>
        Choose Image
      </UploadButton>
    </ImagePickerContainer>
  );
};

export default ImagePicker;
