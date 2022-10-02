import React from 'react'

const FilterList = ({ list, setSearch }) => {

    const handleClick = id => setSearch(id)


    return (
        <ul>
            {
                list?.map(location => (
                    <li key={location.id} onClick={() => handleClick(location.id)}>{location.name}</li>
                ))
            }
        </ul>
    )
}

export default FilterList
