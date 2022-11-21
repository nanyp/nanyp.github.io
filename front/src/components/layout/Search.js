import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Search = () => {
    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        }
        else {
            navigate("/")
        }
    }
    console.log(keyword)

    return (
        <div className="container justify col-12 col-lg-12">
        <form onSubmit={searchHandler}>
            <div className="input-group">
                <input
                type="text"
                id="search_field"
                className="form-control text-center"
                placeholder="Search product"
                onChange={(e) => setKeyword(e.target.value)}
                />

                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i
                            className="fa fa-search"
                            aria-hidden="true"
                        ></i>
                    </button>
                </div>
            </div>            
        </form>
        </div>
    )
}

export default Search;