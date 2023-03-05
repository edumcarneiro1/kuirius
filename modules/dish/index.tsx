import { FunctionComponent, useState, useEffect} from 'react'

import styles from './dish.module.scss';

import Input from '../../components/input';
import Button from '../../components/button';
import Error from '../../components/error';


type Props = {
    onComplete: (params: any) => any;
}

const Dish: FunctionComponent<Props> = ({onComplete}) => {
    const [name, setName] = useState('');

    const [error, setError] = useState(false);

    const addRestaurant = () => {
        if (name === '') {
            setError(true);
        } else {
            onComplete(name);
        }

    };

    useEffect(() => {
        setError(false);
    }, [name]);


    return (
      <div className={styles.dish}>
        <div className={styles.field}>
            <Input placeHolder='Nome do Prato' onChange={setName}/>
        </div>
        <div className={styles.actions}>
             {error && <Error>O nome do prato é obrigatório para adicionar ao Restaurante.</Error>}
            <Button onClick={addRestaurant} primary={true} >Adicionar Prato</Button>
        </div>
      </div>
       
    );
};

export default Dish;