import React from "react";
import Dropzone from "react-dropzone";

export default function ImageDrop(props) {
  return (
    <div className="drop-container">
      <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section className="drop-zone">
            <div className="file-drop" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag a file here, or click to browse</p>
            </div>
          </section>
        )}
      </Dropzone>
      <img className="avatar" src={props.imageSource} alt="User avatar" />
    </div>
  );
}
