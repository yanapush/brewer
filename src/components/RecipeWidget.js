import {useDispatch, useSelector} from "react-redux";
import {brewAction, hideAction} from "../store/recipeWidgetReducer";
import {showFormAction} from "../store/addRecipeFormReducer";
import {useNavigate} from "react-router-dom";

export default function RecipeWidget() {

    const recipe = useSelector(state => state.recipeWidgetReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(recipe);
    return (
   <div className="widget">
       <div className="close-container">
           <button className="img-button close-button" onClick={() => dispatch(hideAction(recipe.recipe.id))}><img src="../photos/close.webp"/></button>
       </div>
      <img className="recipe-img" src={"../photos/" + recipe.recipe.brewer + ".png"}/>
      <h1>{recipe.recipe.recipe_name}</h1>
      <div className="recipe-info">
         <h2>{recipe.recipe.coffee_weight}</h2>
         <h2>{recipe.recipe.water_volume + "ml"}</h2>
         <h2>{recipe.recipe.water_temperature + "C"}</h2>
         <h2>{recipe.recipe.grind_size}</h2>
      </div>
      <h3 onClick={() => {navigate("/coffee/" + recipe.recipe.coffee.id); dispatch(hideAction())}}>{"coffee: " + recipe.recipe.coffee.coffee_name}</h3>

       {recipe.recipe.steps && <div className="steps-container">
         <h1>Steps</h1>
           {recipe.recipe.steps.map(step => <div className="recipe-info steps">
               <h2>{step.step_name}</h2>
               <p>{step.description}</p>
               <h2>{step.start_second}</h2>
               <h2>{step.duration}</h2>
           </div>)}
      </div>}
      { recipe.recipe.characteristic && <div className="characteristics-container">
          <h1>Characteristics</h1>
         <div className="characteristics-row">
            <h2>{"sweetness: " + recipe.recipe.characteristic.sweetness}</h2>
            <h2>{"bitterness: " + recipe.recipe.characteristic.bitterness}</h2>
         </div>
         <div className="characteristics-row">
            <h2>{"acidity: " + recipe.recipe.characteristic.acidity}</h2>
            <h2>{"density: " + recipe.recipe.characteristic.density}</h2>
         </div>
      </div> }
       <div className="button-container">
           <button className="main-button" onClick={() => { dispatch(hideAction()); dispatch(brewAction()); navigate("/brew")}}> brew</button>
           <button className="img-button" onClick={() => {dispatch(hideAction()); dispatch(showFormAction(recipe.recipe))}}><img className="icon" src="../photos/change.png"/></button>
       </div>
    </div>);
}