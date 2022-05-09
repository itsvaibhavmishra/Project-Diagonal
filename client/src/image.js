import React, { useState, useEffect } from "react";

const Image = (props) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(props.blob);
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
  }, [props.blob]);
  return (
    <img
      src={imageSrc}
      alt={props.fileName}
      style={{ width: 150, height: "auto" }}
    />
  );
};

export default Image;
