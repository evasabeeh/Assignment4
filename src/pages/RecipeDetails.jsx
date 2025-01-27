import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../index.css";

const API_KEY = "a010ef86211945d3941eb235934ae003"
const BASE_URL = "https://api.spoonacular.com/recipes"

export function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = React.useState(null);
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchRecipeDetails() {
            try {
                const response = await axios.get(`${BASE_URL}/${id}/information`, {
                    params: {
                        apiKey: API_KEY,
                    },
                });
                setRecipe(response.data);
            } catch (error) {
                setError("Unable to fetch recipe details. Please try again later.");
            }
        }

        fetchRecipeDetails();
    }, [id]);

    if (error) return <p className="error">{error}</p>;

    if (!recipe) return <p>Loading...</p>;

    return (
        <div className="recipe-details">
            <h1>{recipe.title}</h1>
            <div className="recipe-details-data">
                {recipe.image && <img src={recipe.image} alt={recipe.title} className="recipe-image-large" />}
                <div className="ingredients">
                    <h2>Ingredients</h2>
                    <ul>
                        {recipe.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="recipe-details-text">
                <h2>Instructions</h2>
                <p>{recipe.instructions || "No instructions available."}</p>
                <button onClick={() => navigate(-1)} className="back-button">Back</button>
            </div>
        </div>
    );
}