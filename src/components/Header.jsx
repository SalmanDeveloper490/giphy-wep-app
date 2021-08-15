import axios from "axios";
import React from "react";

const Header = ({ search, setSearch, setData, setLoading, setError }) => {
  const inputChangeHandler = (e) => {
    setSearch(e.target.value);
  };
  const clickSearchHandler = async () => {
    try {
      setError(false);
      setLoading(true);
      const results = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          q: search,
        },
      });
      console.log(results.data.data);
      setData(results.data.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="header">
      <div className="row">
        <div className="col-md-4 header__left">
          <div className="header__logo">
            <img
              src="https://media.giphy.com/media/3o6gbbuLW76jkt8vIc/giphy.gif"
              alt="giphy-logo"
            />
          </div>
        </div>
        <div className="col-md-8 header__right">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search Giphy......"
              aria-describedby="basic-addon2"
              value={search}
              onChange={inputChangeHandler}
            />
            <span
              className="input-group-text"
              id="basic-addon2"
              onClick={clickSearchHandler}
            >
              🔍 Search
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
