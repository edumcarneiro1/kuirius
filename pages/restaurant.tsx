import { FunctionComponent, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './add.module.scss';

import Layout from '../modules/layout';
import Title from '../components/title';
import Restaurant from '../modules/restaurant';
import Dish from '../modules/dish';
import { ICity } from '../types/types';


export async function getServerSideProps() {

    const resCities = await fetch(`${process.env.HOST}/api/cities`);
    const cities = await resCities.json();
  
  
    return {
      props: {
        cities: cities.response,
      }, 
    }
  }
  

type Props = {
    cities: ICity[];
  };

const Index: FunctionComponent<Props> = ({cities})  => {
    const [restaurant, setRestaurant] = useState({
      name: '',
      link: '',
      author: '',
      social: '',
      city: ''
    });

    const postRestaurant = (dish) => {
      alert(`Missing post to ${dish} to ${restaurant.name}`);
      //post data dish
    };
    
    const title = restaurant.name === '' ? 'Adicionar Restaurante' : `Adicionar um prato ao restaurante ${restaurant.name}`;
    
    const form = restaurant.name === '' ? 
      <Restaurant  cities={cities} onComplete={setRestaurant}/> : 
      <Dish onComplete={postRestaurant}/>;
    
    return (
        <Layout>
            <div className={styles.title}>
                <Title>{title}</Title>
                { form }
            </div>
        </Layout>
    )
}

export default Index;
