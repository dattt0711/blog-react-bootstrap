import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '../../../common/Chip';
import './styles.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button } from 'react-bootstrap';
const BlogItem = ({
  blog: {
    description,
    blogName,
    createdAt,
    authorName,
    authorAvatar,
    image,
    category,
    _id,
  },
  handleDelete,
}) => {
  return (
    <div className='blogItem-wrap'>
      <img className='blogItem-cover mb-3' src={image} alt='image' />
      <Chip label={category} />
      <h3>{blogName}</h3>
      <p className='blogItem-desc'>{description}</p>
      <footer>
        <div className='blogItem-author'>
          <img src='/assets/images/author.jpg' alt='avatar' />
          <div>
            <h6>Admin</h6>
            <p>{createdAt}</p>
          </div>
        </div>
        <div>
          <Button onClick={() => handleDelete(_id)} className="btn-grad">
            Delete
          </Button>
          <Link className='blogItem-link' to={`/blog/${_id}`}>
            ➝
          </Link>
        </div>

      </footer>
    </div>
  );
};

export default BlogItem;
