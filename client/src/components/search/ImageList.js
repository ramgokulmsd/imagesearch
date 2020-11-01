import React from "react";
import ImageCard from "./ImageCard";
import { Row, Col } from "react-bootstrap";

const ImageList = (props) => {
  const imgs = props.foundImages.map((img) => {
    return <ImageCard key={img.id} image={img} />;
  });

  return (
    <div className="container">
      <Row>
        <Col md={12}>
          <div className="image-list">{imgs}</div>
        </Col>
      </Row>
    </div>
  );
};

export default ImageList;
