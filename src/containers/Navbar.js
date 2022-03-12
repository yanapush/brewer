import RecipeWidget from "../components/RecipeWidget";
import {useDispatch, useSelector} from "react-redux";
import {logoutAction} from "../store/userReduser";
import {Link} from "react-router-dom";

export const Navbar = () => {
    const recipeWidget = useSelector(state => state.recipeWidgetReducer)
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer)

    return (
        <div className="wrapper">
            <nav>
                <Link to={"/main"}><p>home</p></Link>
                <Link to={"/"} ><p onClick={() => {dispatch(logoutAction(user.id)); console.log(user);}}>logout</p></Link>
            </nav>
            <button className="create-button">add recipe</button>
            {recipeWidget.isShown && <RecipeWidget/>}
        </div>
        );
}