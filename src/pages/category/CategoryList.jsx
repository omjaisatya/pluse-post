import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Container } from "react-bootstrap";
import { icons } from "../../Icons/Icons";

const CategoryList = () => {
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);

        // api request
        const response = await axios.get(
          `/category?page=${currentPage}&q=${searchValue}`
        );
        const data = response.data.data;
        setCategories(data.categories);
        setTotalPage(data.pages);

        setLoading(false);
      } catch (error) {
        setLoading(false);

        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    };

    getCategories();
  }, [currentPage]);

  useEffect(() => {
    if (totalPage > 1) {
      let tempPageCount = [];

      for (let i = 1; i <= totalPage; i++) {
        tempPageCount = [...tempPageCount, i];
      }

      setPageCount(tempPageCount);
    } else {
      setPageCount([]);
    }
  }, [totalPage]);

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = async (e) => {
    try {
      const input = e.target.value;

      setSearchValue(input);

      const response = await axios.get(
        `/category?q=${input}&page=${currentPage}`
      );
      const data = response.data.data;

      setCategories(data.categories);
      setTotalPage(data.pages);
    } catch (error) {
      const response = error.response;
      const data = response.data;
      toast.error(data.message, {
        position: "top-right",
        autoClose: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/category/${categoryId}`);

      setShowModal(false);

      const data = response.data;
      toast.success(data.message, {
        position: "top-right",
        autoClose: true,
      });

      const response2 = await axios.get(
        `/category?page=${currentPage}&q=${searchValue}`
      );
      const data2 = response2.data.data;
      setCategories(data2.categories);
      setTotalPage(data2.pages);
    } catch (error) {
      setShowModal(false);
      const response = error.response;
      const data = response.data;
      toast.error(data.message, {
        position: "top-right",
        autoClose: true,
      });
    }
  };

  return (
    <Container>
      <button
        className="button button-block"
        onClick={() => navigate("new-category")}
      >
        <icons.Add />
      </button>
      <h2 className="table-title">Category list</h2>
      <input
        className="saerch-input"
        type="text"
        name="search"
        placeholder="Search here"
        onChange={handleSearch}
      />
      {loading ? (
        "Loading..."
      ) : (
        <table className="table table-success table-striped-columns">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">
                {" "}
                <icons.Create className="m-1" /> Created At
              </th>
              <th scope="col">
                {" "}
                <icons.UpdateHistory className="m-1" /> Updated At
              </th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.title}</td>
                <td>{category.desc}</td>
                <td>
                  {moment(category.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </td>
                <td>
                  {moment(category.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                </td>
                <th>
                  <button
                    className="button"
                    onClick={() => navigate(`update-category/${category._id}`)}
                  >
                    <icons.UpdateBtn className="text-success" />
                  </button>
                  <button
                    className="button"
                    onClick={() => {
                      setShowModal(true);
                      setCategoryId(category._id);
                    }}
                  >
                    <icons.Delete className="text-danger" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {pageCount.length > 0 && (
        <div className="pag-container">
          <button
            className="pag-button"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            prev
          </button>
          {pageCount.map((pageNumber, index) => (
            <button
              className="pag-button"
              key={index}
              onClick={() => handlePage(pageNumber)}
              style={{
                backgroundColor: currentPage === pageNumber ? "#ccc" : "",
              }}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className="pag-button"
            onClick={handleNext}
            disabled={currentPage === totalPage}
          >
            next
          </button>
        </div>
      )}

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setCategoryId(null);
        }}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <div style={{ margin: "0 auto" }}>
            <Button
              className="no-button"
              onClick={() => {
                setShowModal(false);
                setCategoryId(null);
              }}
            >
              No
            </Button>
            <Button className="yes-button" onClick={handleDelete}>
              Yes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CategoryList;
