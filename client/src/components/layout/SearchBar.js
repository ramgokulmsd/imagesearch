import React from "react";
import { Row, Col } from "react-bootstrap";

class SearchBar extends React.Component {
  state = { val: "" };

  onInputChange = (event) => {
    this.setState({ val: event.target.value });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.val);
    this.props.userSubmit(this.state.val);
  };

  render() {
    return (
      <div className="search">
        <div className="container">
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <form onSubmit={this.onFormSubmit} className="flexContainer">
                <div className="form-group">
                  <label>Image Search:</label>
                  <input
                    type="text"
                    value={this.state.val}
                    onChange={this.onInputChange}
                    className="form-control"
                  />
                </div>
              </form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default SearchBar;
