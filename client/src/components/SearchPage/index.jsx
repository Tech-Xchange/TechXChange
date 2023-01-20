import React, {useState} from 'react';
import Search from './Search.jsx';

const SearchPage = ({ changeView }) => {
  return (
    <div>
      < Search changeView={changeView} />
    </div>
  )
};

export default SearchPage;