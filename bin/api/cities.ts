export const getCities = async () => {
    const resCities = await fetch(`/api/cities`);
    const cities = await resCities.json();
    return cities.response.map(city => ({value: city._id, label: city.name}));
};