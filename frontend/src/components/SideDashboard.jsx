import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { RecipesContext } from "../context/RecipesContext"
import Loader from "./Loader"
import RecipeList from "./RecipeList"

const SideDashboard = () => {

    const { user, logoutUser } = useContext(UserContext)

    const { recipes, loadingAllRecipes } = useContext(RecipesContext)

    return (
        <section>
            {loadingAllRecipes ? <Loader /> : (
                <div>
                    <div>
                        <h2>{user.username}</h2>
                    </div>

                    {recipes?.length > 0 ? (
                        <div>
                            <h3>Tus recetas</h3>
                            <ul>
                                {recipes?.map((recipe) => (
                                    <RecipeList key={recipe._id} recipe={recipe} />
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>No tienes recetas</p>
                    )}

                    <button onClick={logoutUser}>Cerrar sesión</button>
                </div>
            )}
        </section>
    )
}

export default SideDashboard    