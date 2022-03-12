import {CoffeeCard} from "../components/CoffeeCard";
import React from "react";
import {useSelector} from "react-redux";

export const VerticalCardContainer = () => {
    const coffee = useSelector(state => state.coffeeReducer)

    return coffee.loading ? (<div>hi</div>) : (<div className="cards-container">
        {
            coffee.coffee.map((coffee) => {
                return (
                    <CoffeeCard id={coffee.id}
                                title={coffee.coffee_name}
                                country={coffee.country}
                                process={coffee.process}/>
                );
            })
        }
    </div>);
};