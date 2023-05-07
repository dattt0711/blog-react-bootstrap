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
const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    let blog = blogList.find((blog) => blog.id === parseInt(id));
    if (blog) {
      setBlog(blog);
    }
  }, []);
  const dataSample = [{}, {}, {}];
  const dataTagList = [{}, {}, {}];
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
                  <h1>{blog.title}</h1>
                  <div className='blog-subCategory'>
                    <Chip label={blog.category} />
                  </div>
                </header>
                <img src={blog.cover} alt='cover' />
                <p className='blog-desc border-bottom'>{blog.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <Button className="btn-grad sm">
                    Edit
                  </Button>
                  <div className="d-flex justify-content-end tag-list mb-2">
                    {dataTagList.map((tag, index) => {
                      if (index > 2) {
                        if (index > 3) return;
                        return <span className="me-2 d-flex align-items-end">...</span>
                      } else {
                        return <Tag
                          label="tag1"
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
                    <Button variant="primary">
                      <FontAwesomeIcon style={{ color: "#fff" }} icon={faComment} />
                    </Button>
                  </div>
                  <div className="mt-2">
                    <CommentsComponent />
                  </div>
                </div>
              </div>
            ) : (
              <EmptyList />
            )}
          </Col>
          <Col sm={3} className="mt-4">
            <h3>Related blog</h3>
            {dataSample.map(data => (
              <Card style={{ maxWidth: '18rem' }} className="mb-5">
                <Card.Img variant="top" src="http://localhost:3000/assets/images/designer-1.jpg" />
                <Card.Body>
                  <Card.Title>
                    <div className="d-flex justify-content-between">
                      <span>Card Sample</span>
                      <RatingStar maxRating={5} value={4} isShowValue={true} />
                    </div>
                  </Card.Title>
                  <Card.Text className="border-bottom pb-2">
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <div className="d-flex justify-content-end tag-list">
                    {dataTagList.map((tag, index) => {
                      if (index > 2) {
                        if (index > 3) return;
                        return <span className="me-2 d-flex align-items-end">...</span>
                      } else {
                        return <Tag
                          label="tag1"
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
      </Container >


    </>
  );
};

export default Blog;