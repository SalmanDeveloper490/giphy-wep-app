import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Pagination from "./Pagination";

const Giphy = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(18);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setLoading(true);
        const results = await axios.get(
          "https://api.giphy.com/v1/gifs/trending",
          {
            params: {
              api_key: process.env.REACT_APP_API_KEY,
            },
          }
        );
        // console.log(results.data.data);
        setData(results.data.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        // console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const pageSelected = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        setData={setData}
        setLoading={setLoading}
        setError={setError}
        data={data}
        loading={loading}
        error={error}
      />
      <Pagination
        pageSelected={pageSelected}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
      />
      <div className="gifs py-3 px-4">
        <div className="row">
          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>Unable to get gifs</strong>, please try again in few
              minutes
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          {loading && (
            <div className="spinner-border  text-primary loader" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {currentItems.map((gif) => (
            <div className="col-md-4" key={gif.id}>
              <img
                src={gif.images.fixed_height.url}
                alt={gif.title}
                className="gif__image"
              />
            </div>
          ))}
        </div>
      </div>
      <Pagination
        pageSelected={pageSelected}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
      />
    </>
  );
};

export default Giphy;
