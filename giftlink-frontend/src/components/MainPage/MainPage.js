import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGifts = async () => {
            try {
                const url = `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:3060'}/api/gifts`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setGifts(data);
            } catch (error) {
                console.error("Error fetching gifts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGifts();
    }, []);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Available Gifts</h2>
            <div className="row">
                {gifts.map((gift) => (
                    <div key={gift.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{gift.name}</h5>
                                <p className="card-text text-muted">Category: {gift.category}</p>
                                <p className="card-text">Condition: <span className="badge bg-info text-dark">{gift.condition}</span></p>
                                <button
                                    className="btn btn-outline-primary btn-sm mt-2"
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
    );
}

export default MainPage;