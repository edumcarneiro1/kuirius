import { FunctionComponent, useState, useEffect} from 'react'
import { useRouter } from 'next/router';

import styles from './restaurant.module.scss';

import Dropdown from '../../components/dropdown';
import { ICity, IDish } from '../../types/types';
import Input from '../../components/input';
import Button from '../../components/button';
import Error from '../../components/error';


type Props = {
    cities: ICity[];
    dishes: IDish[];
    onComplete: (params: any) => any;
}

const Restaurant: FunctionComponent<Props> = ({cities, dishes, onComplete}) => {
    const router = useRouter();
    
    const cityId = router.query && router.query.city && router.query.city !== undefined ? router.query.city.toString() : '';

    const dishId = router.query && router.query.dish && router.query.dish !== undefined ? router.query.dish.toString() : '';

    const [city, setCity] = useState('');

    const [name, setName] = useState('');

    const [link, setLink] = useState('');

    const [author, setAuthor] = useState('');

    const [social, setSocial] = useState('');

    const [dish, setDish] = useState('');

    const [error, setError] = useState(false);
    
    const citiesDropdown = cities.map(city => ({value: city._id, label: city.name}));
    const dishesDropdown = dishes.map(dish => ({value: dish._id, label: dish.name}));

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
                    social: social,
                    dish: dish,
                }
            )   
        }
    };

    const handleReturn = () => {
        router.push('/');
    }

    useEffect(() => {
        setError(false);
    }, [city, name]);

    useEffect(() => {
        if (cityId) {
            setCity(cityId);
        }
        if (dishId) {
            setDish(dishId);
        }
    }, []);

    return (
        <>  
            <div className={styles.restaurant}>
                <div className={styles.field}>
                    <Dropdown placeHolder='Localização' values={citiesDropdown} onChange={setCity} style={'add'} value={city}/>
                </div>
                <div className={styles.field}>
                    <Dropdown placeHolder='Prato' values={dishesDropdown} onChange={setDish} style={'add'} value={dish}/>
                </div>
                <div className={styles.field}>
                    <Input placeHolder='Nome do Restaurante' onChange={setName}/>
                </div>
                <div className={styles.field}>
                    <Input placeHolder='Link do Restaurante (ex: Google Maps)' onChange={setLink}/>
                </div>
                <div className={styles.author}>
                    <h3>A sua autoria (Opcional)</h3>
                    <div className={styles.field}>
                        <Input placeHolder='O seu nome' onChange={setAuthor}/>
                    </div>
                    <div className={styles.field}>
                        <Input placeHolder='Link rede social' onChange={setSocial}/>
                    </div>
                </div>
                <div className={styles.actions}>
                    {error && <Error>Preencha os campos obrigatórios (Localização e Nome do Restaurante)</Error>}
                    <Button onClick={addRestaurant} primary={true} >Adicionar Restaurante</Button>
                    <Button onClick={handleReturn} primary={false} >Encontrar Outros Restaurantes</Button>
                </div>
            </div>
        </> 
    );
};

export default Restaurant;