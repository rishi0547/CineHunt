import React from 'react'

const search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <div className="search">
        <div>
          <img src="search.svg" alt="Search" />
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
           
        </div>
      </div>
      
    </div>
  )
}

export default search
