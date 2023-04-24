export const getDishes = async () => {
    const resDishes = await fetch(`/api/dishes`);
    const dishes = await resDishes.json();
    return dishes.response.map(dish => ({value: dish._id, label: dish.name}));
};