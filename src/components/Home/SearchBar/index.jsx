import React from 'react';
import './styles.css';

const SearchBar = ({ handleSearch, filters }) => (
  <div className='searchBar-wrap'>
    <form >
      <input
        type='text'
        placeholder='Search by blog name or category ...'
        value={filters.search}
        onChange={(event) => handleSearch(event)}
      />
    </form>
  </div>
);

export default SearchBar;
