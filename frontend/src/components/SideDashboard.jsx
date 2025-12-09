import { useContext } from "react"
import { RecipesContext } from "../context/RecipesContext"
import LoaderRecipes from "./LoaderRecipes"
import RecipeList from "./RecipeList"
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import Swal from "sweetalert2";
import FormSearchRecipe from "./FormSearchRecipe"
import HeaderSideDashboard from "./HeaderSideDashboard"

const SideDashboard = () => {

    const { recipes, loadingAllRecipes, deleteRecipeById, recipesResults, noRecipes } = useContext(RecipesContext)

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

    const recipesToShow = recipesResults.length > 0 ? recipesResults : recipes;

    return (
        <section className="h-[635px] p-3 w-[320px] md:w-[400px] xl:w-[450px] 2xl:w-[550px] bg-linear-120 from-[#32aa82] to-[#41c398] shadow-[8px_8px_15px_5px_rgba(0,0,0,0.6)] rounded-lg xl:mt-0 xl:ml-5">
            <div className="flex flex-col w-[300px]">
                <HeaderSideDashboard />

                {loadingAllRecipes ? (
                    <div className="h-[400px] flex justify-center items-center">
                        <LoaderRecipes />
                    </div>
                ) : recipesToShow?.length > 0 ? (

                    <div className="mt-3">
                        <div className="flex flex-row justify-between items-center">
                            <h3 className="text-white hidden md:block text-[25px] font-bold">Tus recetas ({recipes.length})</h3>
                            <FormSearchRecipe />
                        </div>
                        <ul className="flex flex-col gap-3 text-white mt-3 overflow-y-auto h-[400px]">
                            {noRecipes ? <p className="text-white mt-5 text-center text-lg">No se encontraron recetas</p> : (
                                <PerfectScrollbar className="myScroll">
                                    {recipesToShow.map((recipe) => (
                                        <RecipeList handleDelete={deleteRecipe} key={recipe._id} recipe={recipe} />
                                    ))}
                                </PerfectScrollbar>
                            )}
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