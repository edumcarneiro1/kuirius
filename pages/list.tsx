import { FunctionComponent, useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from './list.module.scss';

import { IRestaurantDish } from '../types/types';

import Layout from '../modules/layout';
import Title from '../components/title';
import List from '../modules/list';
import{ Analytics } from '@vercel/analytics/react';


export async function getServerSideProps({query}) {

 const { city,dish } = query;

 let cityName = '';
 let dishName = '';

 if (city && city !== '') {
    const resCity = await fetch(`${process.env.HOST}/api/cities?id=${city}`);
    const cityResult = await resCity.json();
    cityName = cityResult.status === 'success' ? cityResult.response[0].name  : '';
 } 
 
 if (dish && dish !== '') {
  const resDish = await fetch(`${process.env.HOST}/api/dishes?id=${dish}`);
  const dishesResult = await resDish.json();
  dishName = dishesResult.status === 'success' ? dishesResult.response[0].name  : '';
 }
  
  const resRestaurants = await fetch(`${process.env.HOST}/api/restaurants?city=${city}&dish=${dish}`);
  const restaurants = await resRestaurants.json();
  const dishes = restaurants.status === 'success' ? restaurants.response : [];

  return {
    props: {
      city: cityName,
      cityId: city,
      dish: dishName,
      dishes: dishes,
      dishId: dish,
    }, 
  }
}

type Props = {
    city: string;
    dish: string;
    cityId: string,
    dishes: IRestaurantDish[];
    dishId: string;
}

const Index: FunctionComponent<Props> = ({city, cityId, dish, dishes, dishId})  => {
    const router = useRouter();
    const [restaraunts, setRestaurants] = useState<IRestaurantDish[]>([]);
    const [ready, setReady] = useState(false);


  useEffect(() => {
    // todo move to an hook
      const savedRestaurants = localStorage.getItem('restaurants');

      if (!savedRestaurants) {
        const mappedRestaurants = dishes.map((dish) => {return {_id: dish._id, liked: dish.liked, disliked: dish.disliked}});
        localStorage.setItem('restaurants', JSON.stringify(mappedRestaurants));
        setReady(true);
        setRestaurants(dishes);
      } else {
        const localStorageRestaurants = JSON.parse(savedRestaurants);
        const dishesUpdated: IRestaurantDish[] = dishes.map((dish) => {
            const onLocalStorageRestaurant = localStorageRestaurants.find((elem) => elem._id === dish._id);
            
            if (onLocalStorageRestaurant) {
              return {
                _id: dish._id,
                name: dish.name,
                city: dish.city,
                link: dish.link,
                score: dish.score,
                author: dish.author,
                dateOfCreation: dish.dateOfCreation,
                dish: dish.dish,
                liked: onLocalStorageRestaurant.liked,
                disliked: onLocalStorageRestaurant.disliked
              }
            } else {
              localStorageRestaurants.push({
                _id: dish._id,
                liked: dish.liked,
                disliked: dish.disliked
              })

              localStorage.setItem('restaurants', JSON.stringify(localStorageRestaurants));

              return dish;
            }
        });
        setReady(true);
        setRestaurants(dishesUpdated);
      }
  }, [dishes])

    let title = `${city} - Onde comer excelente prato de ${dish}?`;
    
    if (dish === '') {
      title = `${city} - Onde comer melhor?`
    }

    if (city === '') {
      title = `Onde comer excelente prato de ${dish}?`
    }

    return (
        <>
          {ready && <Layout>
              <div className={styles.title}>
                  <Title>{title}</Title>
                  <List dishes={restaraunts} city={cityId} dish={dishId}/>
              </div>
          </Layout> }
          <Analytics />
        </>
    )
}

export default Index;
