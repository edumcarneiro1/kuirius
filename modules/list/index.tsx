import { FunctionComponent } from 'react'

import styles from './list.module.scss'


import Card from '../../components/card';
import Button from '../../components/button';
import { IDish } from '../../bin/types';

type Props = {
  dishes: IDish[];
};



const List: FunctionComponent<Props> = ({dishes}) => {
    const dishesElement = dishes.map((dish, index) => <Card position={index} dish={dish} />);
    return (
      <>
        <div>
          { dishesElement}
        </div>
        <div className={styles.actions}>
          <Button onClick={(e) => {console.log('Adicionar Restaurante')}} primary={true} >Adicionar Restaurante</Button>
          
          <Button onClick={(e) => {console.log('Back Restaurante')}} primary={false} >Encontrar Outros Restaurantes</Button>
        </div>
      </>
      
       
    );
};

export default List;