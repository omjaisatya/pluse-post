import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { icons } from "../../Icons/Icons";

const PostList = () => {
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);

        // api request
        const response = await axios.get(
          `/posts?page=${currentPage}&q=${searchValue}`
        );
        const data = response.data.data;
        setPosts(data.posts);
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

    getPosts();
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

      const response = await axios.get(`/posts?q=${input}&page=${currentPage}`);
      const data = response.data.data;

      setPosts(data.posts);
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

  return (
    <Container>
      <button
        className="button button-block"
        onClick={() => navigate("new-post")}
      >
        <icons.Add className="m-1" />
      </button>
      <h2 className="table-title">Post list</h2>

      <input
        className="saerch-input"
        type="text"
        name="search"
        placeholder="Search here"
        onChange={handleSearch}
      />

      <Container className="flexbox-container wrap">
        {loading
          ? "Loading..."
          : posts.map((post) => (
              <Card
                className="post-card card"
                key={post._id}
                onClick={() => navigate(`detail-post/${post._id}`)}
              >
                <Card.Body className="card-body">
                  <Card.Title className="card-title">{post.title}</Card.Title>
                  <Card.Text className="card-desc card-text">
                    {post.desc.substring(0, 50)}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
      </Container>

      {pageCount.length > 0 && (
        <Container className="pag-container">
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
        </Container>
      )}
    </Container>
  );
};

export default PostList;
