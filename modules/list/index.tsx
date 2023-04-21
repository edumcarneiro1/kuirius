import { FunctionComponent, useState, useEffect } from 'react'
import { useRouter } from 'next/router';

import styles from './list.module.scss'


import Card from '../../components/card';
import Button from '../../components/button';
import Notification from '../../components/notification';

import { IRestaurantDish } from '../../types/types';
import Loading from '../loading';

type Props = {
  dishes: IRestaurantDish[];
  city: string;
  dish: string;
};



const List: FunctionComponent<Props> = ({dishes, city, dish}) => {
    const router = useRouter();

    const [notification, setNotification] = useState('');

    const [loading, setLoading] = useState(false);

    const handleReturn = () => {
      setLoading(true);
      router.push(`/`);
    };

    const handleAdd = () => {
      setLoading(true);
      router.push(`/restaurant?city=${city}&dish=${dish}`);
    }

    useEffect(() => {
      setTimeout(()=> {
        setNotification('');
      }, 3000)
  }, [notification]);

    // eslint-disable-next-line react/jsx-key
    const dishesElement = dishes.length > 0 ? 
      dishes.map((dish, index) => <Card key={index} position={index} dish={dish} setNotification={setNotification} />) :
      <p className={styles.noResults}>
        Não existem restaurantes adicionados. Seja o primeiro a contribuir, adicionando o seu restaurante favorito.
      </p>;
    return (
      <>
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