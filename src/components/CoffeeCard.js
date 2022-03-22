import {useNavigate} from "react-router-dom";

export const CoffeeCard = (props) => {
    const navigate = useNavigate();
    return (
    <div className="coffee-card" key={props.id} coffee_id={props.id}>
        <img src="../photos/coffee.jpeg" alt="coffee image"/>
        <div className="card-content"
             onClick={(e) => {console.log("click");navigate('/coffee/'+ e.currentTarget.parentNode.getAttribute("coffee_id"))}}>
            <h2>{ props.title }</h2>
            <p>{ props.country }</p>
            <p>{ props.process }</p>
        </div>
    </div>
)};

