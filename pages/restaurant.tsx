import { FunctionComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './add.module.scss';
import Layout from '../modules/layout';
import Title from '../components/title';
import Restaurant from '../modules/restaurant';
import Success from '../modules/success';
import Dish from '../modules/dish';
import { ICity, IDish, IRestaurantDish } from '../types/types';
import { stat } from 'fs';
import Loading from '../modules/loading';


export async function getServerSideProps() {

    const resCities = await fetch(`${process.env.HOST}/api/cities`);
    const cities = await resCities.json();

    const resDish = await fetch(`${process.env.HOST}/api/dishes`);
    const dishes = await resDish.json();
  
  
    return {
      props: {
        cities: cities.response,
        dishes: dishes.response
      }, 
    }
  }
  

type Props = {
    cities: ICity[];
    dishes: IDish[];
  };

const Index: FunctionComponent<Props> = ({cities, dishes})  => {
    const router = useRouter();
    
    const [status, setStatus] = useState('');
    
    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(false);

    const [restaurant, setRestaurant] = useState({
      name: '',
      link: '',
      author: '',
      social: '',
      city: '',
      dish: ''
    });

    const postRestaurant = (restaurant) => {
      setLoading(true);
      setRestaurant(restaurant);
      const restaurantDish: IRestaurantDish= {
        name: restaurant.name,
        city: restaurant.city,
        link: restaurant.link,
        score: '1',
        author: restaurant.author,
        dish: restaurant.dish,
        dateOfCreation: Date.now().toString()
      };

      fetch(`${process.env.NEXT_PUBLIC_HOST}/api/createrestaurant`, {
        method: 'POST',
        body: JSON.stringify(restaurantDish)
        }
      )
      .then(response => response.json())
      .then((result) => {
        setLoading(false);
        if (result.status === 'Success') {
          setMessage('Obrigado pela sua contribuição');
          setStatus('success');
        } else {
          setMessage('Ops, algo correu mal, tente novamente');
          setStatus('error');
        }
      })
      .catch((err) => {
        setMessage('Ops, algo correu mal, tente novamente');
        setStatus('error');
      });
    };


    useEffect(() => {
      setTimeout(()=> {
        if (status === 'success') {
          router.push(`/`);
        } else {
          setStatus('');
          setMessage('')
          setRestaurant({
            name: '',
            link: '',
            author: '',
            social: '',
            city: '',
            dish: ''
          });
        }
      }, 1000)
    }, [status]);
    
    const title = restaurant.name === '' ? 'Adicionar um prato a um Restaurante' : `Adicionar um prato ao restaurante ${restaurant.name}`;
    
    const form = <Restaurant  cities={cities} dishes={dishes} onComplete={postRestaurant}/>;

    const pageContent = status === 'success' || status === 'error' ? 
                          <Success success={status === 'success'} message={message}/> : 
                          <>
                            <Title>{title}</Title>
                          { form }
                          </>
    return (
        <Layout>
            {loading && <Loading />}
            <div className={styles.title}>
                { pageContent }
            </div>
        </Layout>
    )
}

export default Index;
