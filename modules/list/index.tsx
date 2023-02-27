import { FunctionComponent, useState, useEffect } from 'react'
import { useRouter } from 'next/router';

import styles from './list.module.scss'


import Card from '../../components/card';
import Button from '../../components/button';
import Notification from '../../components/notification';

import { IRestaurantDish } from '../../types/types';

type Props = {
  dishes: IRestaurantDish[];
};



const List: FunctionComponent<Props> = ({dishes}) => {
    const router = useRouter();

    const [notification, setNotification] = useState('');

    const handleReturn = () => {
      router.push(`/`);
    };

    useEffect(() => {
      setTimeout(()=> {
        setNotification('');
      }, 3000)
  }, [notification]);

    // eslint-disable-next-line react/jsx-key
    const dishesElement = dishes.length > 0 ? 
      dishes.map((dish, index) => <Card key={index} position={index} dish={dish} setNotification={setNotification} />) :
      <p className={styles.noResults}>
        Não existem pratos adicionados, seja o primeiro a contribuir adicionando o seu restaurante favorito
      </p>;
    return (
      <>
        <div className={styles.results}>
          { dishesElement}
        </div>
        <div className={styles.actions}>
          <Button onClick={(e) => {console.log('Adicionar Restaurante')}} primary={true} >Adicionar Restaurante</Button>
          
          <Button onClick={handleReturn} primary={false} >Encontrar Outros Restaurantes</Button>
        </div>
        { notification && <Notification type='success'>{notification}</Notification> }
      </>
      
       
    );
};

export default List;