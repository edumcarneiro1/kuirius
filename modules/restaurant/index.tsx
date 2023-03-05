import { FunctionComponent, useState, useEffect} from 'react'

import styles from './restaurant.module.scss';

import Dropdown from '../../components/dropdown';
import { ICity } from '../../types/types';
import Input from '../../components/input';
import Button from '../../components/button';
import Error from '../../components/error';


type Props = {
    cities: ICity[];
    onComplete: (params: any) => any;
}

const Restaurant: FunctionComponent<Props> = ({cities, onComplete}) => {

    const [city, setCity] = useState('');

    const [name, setName] = useState('');

    const [link, setLink] = useState('');

    const [author, setAuthor] = useState('');

    const [social, setSocial] = useState('');

    const [error, setError] = useState(false);
    
    const citiesDropdown = cities.map(city => ({value: city._id, label: city.name}));

    const addRestaurant = () => {
        if (city === '' || name === '') {
            setError(true);
        } else {
            onComplete(
                {
                    city: city,
                    name: name,
                    link: link,
                    author: author,
                    social: social
                }
            )   
        }
    };

    useEffect(() => {
        setError(false);
    }, [city, name]);

    return (
      <div className={styles.restaurant}>
        <div className={styles.field}>
            <Dropdown placeHolder='Cidade' values={citiesDropdown} onChange={setCity} style={'add'}/>
        </div>
        <div className={styles.field}>
            <Input placeHolder='Nome do Restaurante' onChange={setName}/>
        </div>
        <div className={styles.field}>
            <Input placeHolder='Link do Restaurante (Facebook, Google)' onChange={setLink}/>
        </div>
        <div className={styles.author}>
            <h3>A sua autoria (Opcional)</h3>
            <div className={styles.field}>
                <Input placeHolder='O seu nome' onChange={setAuthor}/>
            </div>
            <div className={styles.field}>
                <Input placeHolder='O seu link Facebook' onChange={setSocial}/>
            </div>
        </div>
        <div className={styles.actions}>
            {error && <Error>Preencha os campos obrigatórios (Cidade e Nome do Restaurante)</Error>}
            <Button onClick={addRestaurant} primary={true} >Adicionar Restaurante</Button>
        </div>
      </div>
       
    );
};

export default Restaurant;