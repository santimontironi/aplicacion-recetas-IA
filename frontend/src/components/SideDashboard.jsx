import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { RecipesContext } from "../context/RecipesContext"
import LoaderRecipes from "./LoaderRecipes"
import RecipeList from "./RecipeList"
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import Swal from "sweetalert2";

const SideDashboard = () => {

    const { user, logoutUser } = useContext(UserContext)
    const { recipes, loadingAllRecipes, deleteRecipeById } = useContext(RecipesContext)

    async function deleteRecipe(id) {
        try {
            const result = await Swal.fire({
                title: "¿Eliminar receta?",
                text: "Esta acción no se puede deshacer",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            });

            if (result.isConfirmed) {
                await deleteRecipeById(id);

                Swal.fire({
                    title: "Eliminada",
                    text: "La receta fue eliminada con éxito",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }

        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error",
                text: "No se pudo eliminar la receta",
                icon: "error"
            });
        }
    }

    return (
        <section className="h-[600px] p-3 w-[500px] bg-linear-120 from-[#32aa82] to-[#41c398] shadow-[8px_8px_15px_5px_rgba(0,0,0,0.6)] rounded-lg xl:mt-0 xl:ml-5 xl:w-[300px] 2xl:w-[550px]">
            <div className="flex flex-col">
                <div className="pt-4 pb-4 border-b-3 border-b-white flex flex-row items-center justify-between">
                    <h2 className="text-white text-[30px] font-bold text-shadow-[5px_5px_10px_rgba(0,0,0,0.6)]">
                        Hola, {user.username}!
                    </h2>
                    <button
                        className="bg-red-600 hover:bg-red-700 p-3 text-white rounded-lg cursor-pointer"
                        onClick={logoutUser}
                    >
                        Cerrar sesión
                    </button>
                </div>

                {loadingAllRecipes ? (
                    <div className="h-[400px] flex justify-center items-center">
                        <LoaderRecipes />
                    </div>
                ) : recipes?.length > 0 ? (

                    <div className="mt-3">
                        <div>
                            <h3 className="text-white text-[25px] font-bold">Tus recetas ({recipes.length})</h3>
                        </div>
                        <ul className="flex flex-col gap-3 text-white mt-3 overflow-y-auto h-[400px]">
                            <PerfectScrollbar className="myScroll">
                                {recipes.map((recipe) => (
                                    <RecipeList handleDelete={deleteRecipe} key={recipe._id} recipe={recipe} />
                                ))}
                            </PerfectScrollbar>
                        </ul>
                    </div>
                ) : (
                    <p className="text-white mt-5 text-center text-lg">No tienes recetas guardadas</p>
                )}
            </div>
        </section>
    )
}

export default SideDashboard