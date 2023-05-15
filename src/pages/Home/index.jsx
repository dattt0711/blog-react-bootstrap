import React, { useState, useEffect } from 'react';
import EmptyList from '../../components/common/EmptyList';
import BlogList from '../../components/Home/BlogList';
import Header from '../../components/Home/Header';
import { blogList } from '../../config/data';
import Button from 'react-bootstrap/Button';
import CreateModal from '../../components/Home/CreateModal';
import RatingStar from '../../components/common/RatingStar';
import PaginationComponent from '../../components/common/Pagination';
import { fetchCreateBlog, fetchDeleteBlogApi, fetchListBlogsApi, fetchEditBlog } from '../../api/blogsAPI.jsx';
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
const initPaginator = {
  pageCount: 6,
  currentPage: 1
}
const initialFilters = {
  page: 1,
  search: '',
}
const Home = () => {
  const [blogs, setBlogs] = useState(blogList);
  const [paginator, setPaginator] = useState(initPaginator);
  const [searchKey, setSearchKey] = useState('');
  const [show, setShow] = useState(false);
  const [createParams, setCreateParams] = useState(initialValue);
  const [filters, setFilters] = useState(initialFilters);
  const [reset, setReset] = useState(false);

  useEffect(async () => {
    const result = await fetchListBlogsApi(filters);
    if (result.data.success) {
      setBlogs(result.data.data.items);
      setPaginator(result.data.data.paginator);
    }
  }, [filters, reset])

  // Handle Dialog
  const handleCloseCreateModal = () => {
    setCreateParams(initialValue)
    setShow(false);
  }
  const handleOpenCreateModal = () => {
    setShow(true);
  }
  const handleSubmit = async () => {
    let formatTags = [];
    if (Array.isArray(createParams.tags)) {
      if (createParams.tags.length > 0) {
        formatTags = createParams.tags.map(tag => tag?.value);
      }
    }
    const tempParams = {
      ...createParams,
      tags: formatTags
    }
    await fetchCreateBlog(tempParams);
    setShow(false);
    setCreateParams(initialValue);
    setReset(prev => !prev);
  }

  // handle create 
  const handleOnChange = (event, type = null) => {
    if (type) {
      setCreateParams({
        ...createParams,
        tags: event,
      })
    } else {
      setCreateParams({
        ...createParams,
        [event.target.name]: event.target.value,
      })
    }
  }


  // Search for blog by category
  const handleSearchResults = () => {
    const allBlogs = blogList;
    const filteredBlogs = allBlogs.filter((blog) =>
      blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setBlogs(filteredBlogs);
  };

  // Clear search and show all blogs
  const handleSearch = (event) => {
    setFilters({
      ...filters,
      search: event.target.value,
    })
  };

  const handlePagination = (value) => {
    setFilters({
      ...filters,
      page: value,
    })
  }
  const handleDelete = async (blogId) => {
    await fetchDeleteBlogApi({
      blogId,
    })
    setReset(prev => !prev);
  }
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Page Header */}
      <Header
        handleOpenCreateModal={handleOpenCreateModal}
        handleSearch={handleSearch}
        filters={filters}
      />

      {/* Blog List & Empty View */}
      {!blogs.length ? <EmptyList /> : <BlogList blogs={blogs} handleDelete={handleDelete} />}
      <div className="d-flex justify-content-center mt-5">
        <PaginationComponent handlePagination={handlePagination} paginator={paginator} />
      </div>

      <CreateModal
        show={show}
        handleClose={handleCloseCreateModal}
        handleSubmit={handleSubmit}
        title={'Create a new blog'}
        handleOnChange={handleOnChange}
        createParams={createParams}
        options={options}
      />
    </div>
  );
};

export default Home;
