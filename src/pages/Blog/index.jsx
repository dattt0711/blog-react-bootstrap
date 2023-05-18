import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { blogList } from '../../config/data';
import Chip from '../../components/common/Chip';
import EmptyList from '../../components/common/EmptyList';
import './styles.css';
import { Link } from 'react-router-dom';
import CommentsComponent from './components/Comments';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import RatingStar from '../../components/common/RatingStar';
import Tag from '../../components/common/Tag';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { fetchInfoBlogApi, fetchEditBlog, fetchRelatedListBlogsApi, fetchDeleteBlogApi } from '../../api/blogsAPI';
import { fetchListCommentsApi, fetchCreateComment } from '../../api/commentsAPI';
import CommentModal from './components/CommentModal';
import EditModal from './components/EditModal';
const initialCommentValue = {
  "username": "",
  "comment": "",
  "rating": "",
}
const initialValue = {
  blogName: '',
  description: '',
  category: '',
  tags: '',
  image: '',
}
const options = [
  { value: 'sport', label: 'Sport' },
  { value: 'social', label: 'Social' },
  { value: 'health', label: 'Health' },
  { value: 'tech', label: 'Tech' },
  { value: 'drama', label: 'Drama' },
  { value: 'travel', label: 'Travel' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'environment', label: 'Enviroment' },
  { value: 'politics', label: 'Politics' },
  { value: 'finance', label: 'Finance' },
]
const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [commentParams, setCommentParams] = useState(initialCommentValue);
  const [editParams, setEditParams] = useState(initialValue);
  const [relatedList, setRelatedList] = useState([]);
  const [render, setRender] = useState(false);
  useEffect(async () => {
    const result = await fetchInfoBlogApi(id);
    if (result) {
      setBlog(result.data.data);
      const tempTags = result.data.data.tags.map(tag => {
        const findTag = options.find(op => op.value === tag);
        if (findTag) return findTag;
        return {
          value: tag,
          label: "Not found"
        }
      })
      setEditParams({
        ...result.data.data,
        tags: tempTags,
      });
      const dataRelatedList = await fetchRelatedListBlogsApi({
        category: result.data.data.category,
      })
      setRelatedList(dataRelatedList.data.data.items);
    }
  }, [render, id]);
  useEffect(async () => {
    if (blog) {
      const result = await fetchListCommentsApi({ blogObjId: blog?._id });
      if (result) {
        setComments(result.data.data)
      }
    }
  }, [blog, render])
  const handleOpenCommentDialog = () => {
    setOpenCommentDialog(true);
  }
  const handleCloseCommentDialog = () => {
    setCommentParams(initialCommentValue);
    setOpenCommentDialog(false);
  }
  const handleSubmitComment = async () => {
    await fetchCreateComment({
      ...commentParams,
      blogId: id,
    });
    setCommentParams(initialCommentValue);
    setOpenCommentDialog(false);
    setRender((prev) => !prev);
  }
  const handleOnChange = (event) => {
    setCommentParams({
      ...commentParams,
      [event.target.name]: event.target.value,
    })
  }
  const handleRating = (rating) => {
    setCommentParams({
      ...commentParams,
      rating,
    })
  }
  // Edit blog
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  }
  const handleOpenEditModal = () => {
    setShowEditModal(true);
  }
  const handleSubmitEdit = async () => {
    let formatTags = [];
    if (Array.isArray(editParams.tags)) {
      if (editParams.tags.length > 0) {
        formatTags = editParams.tags.map(tag => tag?.value);
      }
    }
    const tempParams = {
      ...editParams,
      tags: formatTags,
      blogId: id,
    }
    await fetchEditBlog(tempParams);
    setShowEditModal(false);
    setEditParams(initialValue);
    setRender(prev => !prev);
  }

  // handle edit
  const handleOnChangeEdit = (event, type = null) => {
    if (type) {
      setEditParams({
        ...editParams,
        tags: event,
      })
    } else {
      setEditParams({
        ...editParams,
        [event.target.name]: event.target.value,
      })
    }
  }
  const dataSample = [{}, {}, {}];
  // const dataTagList = [{}, {}, {}];
  return (
    <>
      <Link className='blog-goBack' to='/'>
        <button className="btn-grad sm">
          <span> &#8592;</span> <span>Go Back</span>
        </button>
      </Link>
      <Container>
        <Row>
          <Col sm={1} ></Col>
          <Col sm={8} >
            {blog ? (
              <div className='blog-wrap'>
                <header>
                  <p className='blog-date'>Published {blog.createdAt}</p>
                  <h1>{blog.blogName}</h1>
                  <div className='blog-subCategory'>
                    <Chip label={blog.category} />
                  </div>
                </header>
                <img src={blog.image} alt='cover' />
                <p className='blog-desc'>{blog.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <Button onClick={handleOpenEditModal} className="btn-grad sm">
                    Edit
                  </Button>
                  <div className="d-flex justify-content-end tag-list mb-2">
                    {blog.tags.map((tag, index) => {
                      if (index > 2) {
                        if (index > 3) return;
                        return <span className="me-2 d-flex align-items-end">...</span>
                      } else {
                        return <Tag
                          label={tag}
                        />
                      }
                    })
                    }
                  </div>
                </div>
                <div className="blog-comment mt-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <h2 className="comment-title">
                      Blog comment
                    </h2>
                    <Button
                      className="btn-grad sm"
                      onClick={handleOpenCommentDialog}
                      variant="primary">
                      <FontAwesomeIcon
                        style={{ color: "#fff" }}
                        icon={faComment} />
                    </Button>
                  </div>
                  <div className="mt-2">
                    <CommentsComponent
                      comments={comments}

                    />
                  </div>
                </div>
              </div>
            ) : (
              <EmptyList />
            )}
          </Col>
          <Col sm={3} className="mt-4">
            <h3>Related blog</h3>
            {relatedList.map(data => (
              <Card style={{ maxWidth: '18rem' }} className="mb-5">
                <Card.Img variant="top" src={data.image} style={{ maxHeight: "150px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>
                    <div className="d-flex justify-content-between">
                      <Link style={{ cursor: "pointer", textDecoration: "none", color: "#000" }} to={`/blog/${data._id}`}>
                        <span style={{ cursor: "pointer", textDecoration: "none" }}>{data.blogName}</span>
                      </Link>
                      {/* <RatingStar maxRating={5} value={data.rating} isShowValue={true} /> */}
                    </div>
                  </Card.Title>
                  <Card.Text className="border-bottom pb-2 related-des">
                    {data.description}
                  </Card.Text>
                  <div className="d-flex justify-content-end tag-list">
                    {data?.tags?.length > 0 && blog.tags.map((tag, index) => {
                      if (index > 2) {
                        if (index > 3) return;
                        return <span className="me-2 d-flex align-items-end">...</span>
                      } else {
                        return <Tag
                          label={tag}
                        />
                      }
                    })
                    }
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
        <CommentModal
          show={openCommentDialog}
          handleClose={handleCloseCommentDialog}
          handleSubmit={handleSubmitComment}
          handleOnChange={handleOnChange}
          commentParams={commentParams}
          handleRating={handleRating}
          title="Comment"
        />
        <EditModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          handleSubmit={handleSubmitEdit}
          title={'Edit a blog'}
          handleOnChange={handleOnChangeEdit}
          editParams={editParams}
          options={options}
        />
      </Container >


    </>
  );
};

export default Blog;
