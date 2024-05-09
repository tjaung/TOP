import FavoriteFood from "./FavoriteFoodItem";

function FavoriteFoodLine(){
    const favoriteFoods = ['Pizza', 'Burger', 'Glizzy', 'Bread']
    return <div>My favorite food is: <FavoriteFood favoriteFoods={favoriteFoods} /></div>
}

export default FavoriteFoodLine