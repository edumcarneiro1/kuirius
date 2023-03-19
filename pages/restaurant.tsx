import { FunctionComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './add.module.scss';
import Layout from '../modules/layout';
import Title from '../components/title';
import Restaurant from '../modules/restaurant';
import Success from '../modules/success';
import Dish from '../modules/dish';
import { ICity, IRestaurantDish } from '../types/types';
import { stat } from 'fs';


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
    const router = useRouter();
    
    const [status, setStatus] = useState('');
    
    const [message, setMessage] = useState('');

    const [restaurant, setRestaurant] = useState({
      name: '',
      link: '',
      author: '',
      social: '',
      city: ''
    });

    const postRestaurant = (dish) => {
      const restaurantDish: IRestaurantDish= {
        name: restaurant.name,
        city: restaurant.city,
        link: restaurant.link,
        score: '1',
        author: restaurant.author,
        dish: dish,
        dateOfCreation: Date.now().toString()
      };

      fetch(`${process.env.NEXT_PUBLIC_HOST}/api/createrestaurant`, {
        method: 'POST',
        body: JSON.stringify(restaurantDish)
        }
      )
      .then(response => response.json())
      .then((result) => {
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
            city: ''
          });
        }
      }, 2000)
    }, [status]);
    
    const title = restaurant.name === '' ? 'Adicionar Restaurante' : `Adicionar um prato ao restaurante ${restaurant.name}`;
    
    const form = restaurant.name === '' ? 
      <Restaurant  cities={cities} onComplete={setRestaurant}/> : 
      <Dish onComplete={postRestaurant}/>;

    const pageContent = status === 'success' || status === 'error' ? 
                          <Success success={status === 'success'} message={message}/> : 
                          <>
                            <Title>{title}</Title>
                          { form }
                          </>
    return (
        <Layout>
            <div className={styles.title}>
                { pageContent }
            </div>
        </Layout>
    )
}

export default Index;
