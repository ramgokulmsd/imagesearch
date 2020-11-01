import React from "react";
import Headerbar from "../layout/Headerbar";
import SearchBar from "../layout/SearchBar";
import ImageList from "./ImageList";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends React.Component {
  state = { images: [] };
  onSearchSubmit = async (term) => {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: term },
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
    });
    this.setState({ images: response.data.results });
  };

  render() {
    return (
      <div className="main-frame">
        <Headerbar />
        <SearchBar userSubmit={this.onSearchSubmit} />
        <p>Found: {this.state.images.length} images</p>
        <ImageList foundImages={this.state.images} />
      </div>
    );
  }
}

export default Main;
