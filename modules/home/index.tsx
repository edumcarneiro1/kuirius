import { FunctionComponent, use } from 'react'
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './home.module.scss'
import Image from 'next/image';

// Types
import {ICity, IDish } from '../../bin/types';

type Props = {
  dishes: IDish[];
  cities: ICity[];
};



//Components
import Logo from '../../components/logo';
import Title from '../../components/title';
import Dropdown from '../../components/dropdown';
import Button from '../../components/button';


const Home: FunctionComponent<Props> = ({dishes, cities}) => {
    const router = useRouter();

    const dishesDropdown = dishes.map(dish => ({value: dish.id, label: dish.name}));
    const citiesDropdown = cities.map(city => ({value: city.id, label: city.name}));

    const [dish, setDish] = useState('');

    const [city, setCity] = useState('');

    const handleSubmit = () => {
      router.push(`http://localhost:3000/list?city=${city}&dish=${dish}`);
    };

    return (
       <div className={styles.container}>
          <div className={styles.image}>
              <Image 
              src="/home.png"
              alt="Home Layoyt"
              width={177}
              height={180}
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
                  <Button onClick={handleSubmit} primary={true} >Ver Restaurantes</Button>
             </div>
          </div>
       </div>
    );
};

export default Home;