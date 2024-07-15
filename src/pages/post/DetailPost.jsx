import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import moment from "moment";
import { Modal, Button, Container } from "react-bootstrap";
import { icons } from "../../Icons/Icons";
import Loading from "../../Icons/Loading";

const DetailPost = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;

  useEffect(() => {
    if (postId) {
      const getPost = async () => {
        try {
          setLoading(true);
          // api request
          const response = await axios.get(`/posts/${postId}`);
          const data = response.data.data;

          setPost(data.post);
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

      getPost();
    }
  }, [postId]);

  useEffect(() => {
    if (post && post?.file) {
      const getFile = async () => {
        try {
          // api request
          const response = await axios.get(
            `/file/signed-url?key=${post.file.key}`
          );
          const data = response.data.data;

          setFileUrl(data.url);
        } catch (error) {
          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            position: "top-right",
            autoClose: true,
          });
        }
      };

      getFile();
    }
  }, [post]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/posts/${postId}`);

      setShowModal(false);

      const data = response.data;
      toast.success(data.message, {
        position: "top-right",
        autoClose: true,
      });

      navigate("/posts");
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
      <button className="button button-block" onClick={() => navigate(-1)}>
        <icons.Back className="m-1" />
      </button>

      <Container className="detail-container">
        <h2 className="post-title">{post?.title}</h2>
        <h6 className="post-category">
          <icons.Category className="m-1" />
          Category: {post?.category?.title}
        </h6>
        <h6 className="post-category">
          <icons.Create className="m-1" />
          Created at: {moment(post?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </h6>
        <h6 className="post-category">
          <icons.UpdateHistory className="m-1" />
          Updated at: {moment(post?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
        </h6>
        {loading ? (
          <Loading />
        ) : (
          <p
            className="post-desc p-3 border rounded"
            style={{ backgroundColor: "#EBF4F6" }}
          >
            {post?.desc}
          </p>
        )}

        <img src={fileUrl} alt="file-not-found" height={100} width={200} />

        <Container style={{ display: "flex" }}>
          <button
            className="button button-block m-2"
            onClick={() => setShowModal(true)}
          >
            <icons.Delete className="m-1 text-danger" />
          </button>

          <button
            className="button button-block m-2"
            onClick={() => navigate(`/posts/update-post/${postId}`)}
          >
            <icons.UpdateBtn className="m-1 text-success" />
          </button>
        </Container>
      </Container>

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
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

export default DetailPost;
