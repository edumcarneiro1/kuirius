import { FunctionComponent, useState, useEffect } from 'react'
import { useRouter } from 'next/router';

import styles from './list.module.scss'


import Card from '../../components/card';
import Button from '../../components/button';
import Notification from '../../components/notification';
import SimpleDropdown from '../../components/simpleDropdown';

import { IRestaurantDish, INTERACTION } from '../../types/types';
import Loading from '../loading';

import { sort } from '../../hooks';

type Props = {
  dishes: IRestaurantDish[];
  city: string;
  dish: string;
};


const List: FunctionComponent<Props> = ({dishes, city, dish}) => {
    const router = useRouter();

    const [notification, setNotification] = useState('');

    const [loading, setLoading] = useState(false);

    const [restaurants, setRestaurants] = useState(dishes);

    const [sortCondition, setScoreCondition] = useState('-score');

    const handleReturn = () => {
      setLoading(true);
      router.push(`/`);
    };

    const handleAdd = () => {
      setLoading(true);
      router.push(`/restaurant?city=${city}&dish=${dish}`);
    }

    const handleSort = (condition) => {
      setScoreCondition(condition);
      setRestaurants(sort(restaurants, condition));
    }

    const handleInteraction = (id: string, interaction: INTERACTION) => {
      const restaurantsUpdated = restaurants.map((restaurant) => {
        if (restaurant._id === id) {
          let newLikeValue = restaurant.liked;
          let newDislikeValue = restaurant.disliked;
          let newScore = parseInt(restaurant.score);
          const oldScore = parseInt(restaurant.score);
          if (interaction === INTERACTION.Like) {
              if (restaurant.liked) {
                 //Descrease score -1 on DB
                newScore = oldScore - 1;
                newLikeValue = false;
              } else {
                 //Increase score +1 on DB
                newLikeValue = true;

                if (restaurant.disliked) {
                    newDislikeValue = false;
                    newScore = oldScore + 2;
                } else {
                    newScore = oldScore + 1;
                }
              }
          } else if(interaction === INTERACTION.Dislike){
            if (restaurant.disliked) {
                //Increase score +1 on DB
                newScore = oldScore + 1;
                newDislikeValue = false;

            } else {
                //Descrease score -1 on DB
                newDislikeValue = true;
                if (restaurant.liked) {
                    newLikeValue = false;
                    newScore = oldScore - 2;
                } else {
                    newScore = oldScore - 1;
                }
            }   
          }
          const newRestaurant = restaurant;
          
          newRestaurant.score = newScore.toString();
          newRestaurant.liked = newLikeValue;
          newRestaurant.disliked = newDislikeValue;

          fetch(`${process.env.NEXT_PUBLIC_HOST}/api/restaurants?city=${router.query.city}&dish=${router.query.dish}`, {
              method: 'POST',
              body: JSON.stringify(newRestaurant)
              }
          );
          
          //Todo: move to a hook
          if (typeof window !== 'undefined') {
            const savedRestaurants = localStorage.getItem('restaurants');

            if (savedRestaurants) {
              const localStorageRestaurants = JSON.parse(savedRestaurants);

              const newLocalStorage = localStorageRestaurants.map((restaurantStorage) => {
                if (restaurantStorage._id === newRestaurant._id) {
                  return {
                    _id: newRestaurant._id,
                    liked: newRestaurant.liked,
                    disliked: newRestaurant.disliked
                  }
                } else {
                  return restaurantStorage
                }
              })

              localStorage.setItem('restaurants', JSON.stringify(newLocalStorage));
            }
          }
          

          return newRestaurant;

        } else {
          return restaurant;
        }
      }); 

      setRestaurants(sortCondition === '-score' ? sort(restaurantsUpdated, '-score'): restaurantsUpdated);
    }

    useEffect(() => {
      setTimeout(()=> {
        setNotification('');
      }, 3000)
  }, [notification]);


    // eslint-disable-next-line react/jsx-key
    const dishesElement = restaurants.length > 0 ? 
    restaurants.map((resturantDish, index) => <Card 
                                        key={resturantDish._id} 
                                        position={index} 
                                        dish={resturantDish} 
                                        setNotification={setNotification} 
                                        setInteraction={handleInteraction}
                                        />) :
      <p className={styles.noResults}>
        Não existem restaurantes adicionados. Seja o primeiro a contribuir, adicionando o seu restaurante favorito.
      </p>;
    return (
      <>
        <div className={styles.sort}>
          <SimpleDropdown 
              values={[
                  { value: '-score', name: 'Gostos'},
                  { value: 'name', name: 'Alfabética'},
              ]}
              defaultValue={sortCondition}
              onChange={handleSort}
          />
        </div>
        {loading && <Loading />}
        <div className={styles.results}>
          { dishesElement}
        </div>
        <div className={styles.actions}>
          <Button 
              onClick={handleAdd} 
              primary={true} 
              disclaimer={'Conhece um restaurante que merecia estar nesta lista?'} 
          >
            Adicionar Restaurante
          </Button>
          
          <Button onClick={handleReturn} primary={false} >Encontrar Outros Restaurantes</Button>
        </div>
        { notification && <Notification type='success'>{notification}</Notification> }
      </>
      
       
    );
};

export default List;