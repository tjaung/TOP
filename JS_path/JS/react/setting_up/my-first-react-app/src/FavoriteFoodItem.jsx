function FoodItem(props) {
    return <li>{props.food}</li>
}

function FavoriteFood(props) {
    // const favoriteFoods = ['Pizza', 'Burger', 'Glizzy', 'Bread']
    return (
        <ul>
            {props.favoriteFoods.map((food) => {
                return food.startsWith("B") ? <li key={food}>{food}</li> : null;
          })} 
        </ul>

        // <ul>
        //     {favoriteFoods.map((food) => {
        //         return <FoodItem key={food} food={food} />;
        //     })}
        // </ul>
    )
}

export default FavoriteFood