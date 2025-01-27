import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../index.css";

const API_KEY = "a010ef86211945d3941eb235934ae003";
const BASE_URL = "https://api.spoonacular.com/recipes";

export function Home() {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const categories = [
        "Italian",
        "American",
        "Mexican",
        "Indian",
        "Chinese",
        "Vegetarian",
        "Vegan",
    ];

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/complexSearch`, {
                params: {
                    apiKey: API_KEY,
                    query: searchTerm,
                    cuisine: category,
                    number: 10,
                },
            });
            setRecipes(response.data.results);
        } catch (error) {
            setError("Unable to fetch recipes. Please try again later.");
        }
        setLoading(false);
    };

    useEffect(() => {
        handleSearch();
    }, [searchTerm, category]);

    return (
        <div className="home">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for recipes by name or ingredients"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <button onClick={handleSearch}>Search</button>

                <div className="category-filter">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {error && <p className="error">{error}</p>}
            {loading && <p>Loading...</p>}

            <ul className="recipe-list">
                {recipes.length === 0 && !loading && (
                    <p>No recipes found. Try adjusting your search or filter.</p>
                )}
                {recipes.map((recipe) => (
                    <li key={recipe.id} className="recipe-item">
                        <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                            <h3>{recipe.title}</h3>
                            {recipe.image && (
                                <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
