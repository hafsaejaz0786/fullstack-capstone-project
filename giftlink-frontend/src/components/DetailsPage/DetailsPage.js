import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DetailsPage() {
    const { id } = useParams();
    const [gift, setGift] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGiftDetails = async () => {
            try {
                const url = `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:3060'}/api/gifts/${id}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error("Gift not found");
                const data = await response.json();
                setGift(data);
            } catch (error) {
                console.error("Error fetching gift details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGiftDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );
    }

    if (!gift) {
        return (
            <div className="container mt-5 text-center">
                <h3>Gift not found</h3>
                <button className="btn btn-secondary mt-3" onClick={() => navigate('/gifts')}>Back to Gifts</button>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <button className="btn btn-outline-secondary mb-4" onClick={() => navigate('/gifts')}>
                &larr; Back to Gifts
            </button>
            <div className="card shadow-lg p-4">
                <h2 className="card-title text-primary">{gift.name}</h2>
                <hr />
                <div className="row mt-3">
                    <div className="col-md-6">
                        <p><strong>Category:</strong> {gift.category}</p>
                        <p><strong>Condition:</strong> <span className="badge bg-success">{gift.condition}</span></p>
                        <p><strong>Posted By:</strong> {gift.posted_by}</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Zipcode:</strong> {gift.zipcode}</p>
                        <p><strong>Date Added:</strong> {new Date(Number(gift.date_added) * 1000).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;