import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searched, setSearched] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const queryParams = new URLSearchParams();
            if (category) queryParams.append('category', category);
            if (name) queryParams.append('name', name);

            const url = `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:3060'}/api/search?${queryParams.toString()}`;
            const response = await fetch(url);
            const data = await response.json();
            setSearchResults(data);
            setSearched(true);
        } catch (error) {
            console.error("Error performing search:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Search Gifts</h2>
            <form onSubmit={handleSearch} className="row g-3 mb-5">
                <div className="col-md-5">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="col-md-5">
                    <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Fashion">Fashion</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <button type="submit" className="btn btn-primary w-100">Search</button>
                </div>
            </form>

            {searched && (
                <div>
                    <h4>Results ({searchResults.length})</h4>
                    <div className="row mt-3">
                        {searchResults.map((gift) => (
                            <div key={gift.id} className="col-md-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{gift.name}</h5>
                                        <p className="card-text text-muted">Category: {gift.category}</p>
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => navigate(`/gifts/${gift.id}`)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchPage;