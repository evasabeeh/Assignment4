import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../index.css";

const API_KEY = "a010ef86211945d3941eb235934ae003"
const BASE_URL = "https://api.spoonacular.com/recipes"

export function Home() {
    const [recipes, setRecipes] = React.useState([]);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        async function fetchRecipes() {
            try {
                const response = await axios.get(`${BASE_URL}/complexSearch`, {
                    params: {
                        apiKey: API_KEY,
                        number: 10,
                    },
                });
                setRecipes(response.data.results);
            } catch (error) {
                setError("Unable to fetch recipes. Please try again later.");
            }
        }

        fetchRecipes();
    }, []);

    return (
        <div className="home">
            <h1>Recipes</h1>
            {error ? (
                <p className="error">{error}</p>
            ) : (
                <ul className="recipe-list">
                    {recipes.map((recipe) => (
                        <li key={recipe.id} className="recipe-item">
                            <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                                <h3>{recipe.title}</h3>
                                {recipe.image && <img src={recipe.image} alt={recipe.title} className="recipe-image" />}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
