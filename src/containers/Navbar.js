import RecipeWidget from "../components/RecipeWidget";
import {useDispatch, useSelector} from "react-redux";
import {logoutAction} from "../store/userReduser";
import {Link} from "react-router-dom";
import AddRecipeForm from "../components/AddRecipeForm";
import {showFormAction} from "../store/addRecipeFormReducer";

export const Navbar = () => {
    const recipeWidget = useSelector(state => state.recipeWidgetReducer);
    const addRecipeForm = useSelector(state => state.addRecipeFormReducer);
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer);

    return (
        <div className="wrapper">
            <nav>
                <Link to={"/main"}><img className="icon" src="../photos/home.png"/></Link>
                <Link to={"/"} ><img className="icon" src="../photos/logout.jpeg" onClick={() => {dispatch(logoutAction(user.id));}}/></Link>
            </nav>
            <button className="create-button img-button" onClick={() => dispatch(showFormAction())}><img src="../photos/plus.png"/></button>
            {recipeWidget.isShown && <RecipeWidget/>}
            { addRecipeForm.isShown && <AddRecipeForm />}
        </div>
        );
}