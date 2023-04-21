import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';

import styles from './list.module.scss';

import { IRestaurantDish } from '../types/types';

import Layout from '../modules/layout';
import Title from '../components/title';
import List from '../modules/list';


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

    let title = `${city} - Onde comer excelente prato de ${dish}?`;
    
    if (dish === '') {
      title = `${city} - Onde comer melhor?`
    }

    if (city === '') {
      title = `Onde comer excelente prato de ${dish}?`
    }

    
    return (
        <Layout>
            <div className={styles.title}>
                <Title>{title}</Title>
                <List dishes={dishes} city={cityId} dish={dishId}/>
            </div>
        </Layout>
    )
}

export default Index;
