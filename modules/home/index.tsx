import { FunctionComponent, use } from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './home.module.scss'
import Image from 'next/image';

// Types
import {ICity, IDish } from '../../types/types';

type Props = {
  dishes: IDish[];
  cities: ICity[];
};



//Components
import Logo from '../../components/logo';
import Title from '../../components/title';
import Dropdown from '../../components/dropdown';
import Button from '../../components/button';
import Error from '../../components/error';
import Loading from '../loading';

const Home: FunctionComponent<Props> = ({dishes, cities}) => {
    const router = useRouter();

    const dishesDropdown = dishes.map(dish => ({value: dish._id, label: dish.name}));
    const citiesDropdown = cities.map(city => ({value: city._id, label: city.name}));

    const [loading, setLoading] = useState(false);

    const [dish, setDish] = useState('');

    const [city, setCity] = useState('');
    
    const [error, setError] = useState(false);

    const handleSubmit = () => {
      if (dish === '' && city === '') {
        setError(true);
      } else {
        setLoading(true);
        router.push(`/list?city=${city}&dish=${dish}`);
      }
    };

    const handleAdd = () => {
      router.push('/restaurant')
    }

    useEffect(() => {
        setError(false);
    }, [city, dish]);


    return (
      <>
        {loading && <Loading />}
        <div className={styles.container}>
            <div className={styles.image}>
                <Image 
                src="/home.png"
                alt="Home Layoyt"
                width={177}
                height={196}
              />
            </div>
            <div className={styles.page}>
                <div className={styles.logo}>
                  <Logo slogan={'Pelo amor à comida e restauração'} >Kuirius</Logo>
                </div>
                <div className={styles.title}>
                  <Title>Onde comer bem?</Title>
                </div>
                <div className={styles.dropdown}>
                    <Dropdown placeHolder='Comida' values={dishesDropdown} onChange={setDish}/>
                </div>
                <div className={styles.dropdown}>
                    <Dropdown placeHolder='Cidade' values={citiesDropdown} onChange={setCity}/>
                </div>
                <div className={styles.button}>
                    {error && <Error>Escolha pelo menos uma cidade ou um prato.</Error>}
                    <Button onClick={handleSubmit} primary={true} >Ver Restaurantes</Button>
                    <Button 
                      onClick={handleAdd} 
                      primary={false} 
                      disclaimer={'Não encontrou o seu prato favorito? Adicione-o aqui.'}
                    >Adicionar Prato</Button>
              </div>
            </div>
        </div>
      </>
       
    );
};

export default Home;