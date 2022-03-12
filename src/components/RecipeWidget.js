import {useDispatch, useSelector} from "react-redux";
import {hideAction} from "../store/recipeWidgetReducer";

export default function RecipeWidget() {

    const recipe = useSelector(state => state.recipeWidgetReducer);
    const dispatch = useDispatch();

    return (
   <div className="widget">
       <div className="close-container">
           <button onClick={() => dispatch(hideAction(recipe.recipe.id))}>close</button>
       </div>
      <img src={"./photos/" + recipe.recipe.brewer + ".png"}/>
      <h1>{recipe.recipe.recipe_name}</h1>
      <div className="recipe-info">
         <h2>{recipe.recipe.coffee_weight}</h2>
         <h2>{recipe.recipe.water_volume + "ml"}</h2>
         <h2>{recipe.recipe.water_temperature + "C"}</h2>
      </div>
      <h3>{"coffee:" + recipe.recipe.coffee.coffee_name}</h3>
      <h3>{"brewer type:" + recipe.recipe.brewer}</h3>
       { recipe.recipe.steps && <div className="steps-container">
         <h1>Steps</h1>
      </div>}
      { recipe.recipe.characteristic && <div className="characteristics-container">
         <div className="characteristics-row">
            <p>{"sweetness: " + recipe.recipe.characteristics.sweetness}</p>
            <p>{"bitterness: " + recipe.recipe.characteristics.bitterness}</p>
         </div>
         <div className="characteristics-row">
            <p>{"acidity: " + recipe.recipe.characteristics.acidity}</p>
            <p>{"density: " + recipe.recipe.characteristics.density}</p>
         </div>
      </div> }
       <div className="button-container">
           <button className="main-button"> brew</button>
           <button>change</button>
       </div>
    </div>);
}