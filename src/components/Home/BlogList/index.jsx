import React from 'react';
import BlogItem from './BlogItem';
import './styles.css';

const BlogList = ({ blogs, handleDelete }) => {
  return (
    <div className='blogList-wrap'>
      {blogs.map((blog) => (
        <BlogItem blog={blog} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default BlogList;
