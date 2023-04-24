import { FunctionComponent, useState, useEffect, lazy, Suspense } from 'react'
import { useRouter } from 'next/router';
import styles from './home.module.scss'
import Image from 'next/image';


//Components
import Logo from '../../components/logo';
import Title from '../../components/title';
import Dropdown from '../../components/dropdown';
import Button from '../../components/button';
import Error from '../../components/error';
import Loading from '../loading';

//Modules 
const Cities = lazy(() => import('../cities/cities'))
const Dishes = lazy(() => import('../dishes/dishes'))

const Home: FunctionComponent<{}> = () => {
    const router = useRouter();

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
  
    useEffect(() => {
        setError(false);
    }, [city, dish]);

    return (
      <>
        {loading && <Loading />}
        <div className={styles.container}>
          <Image 
            className={styles.landingImage}
            src="/background.jpeg"
            alt="Kuirius, pelo amor à comida"
            layout="fill"
            objectFit="cover"
            objectPosition='left'

          />
            <div className={styles.page}>
                <div className={styles.logo}>
                  <Logo slogan={'Pelo amor à comida e bons restaurantes'} >Kuirius</Logo>
                </div>
                <div className={styles.title}>
                  <Title style={'white'}>Onde comer bem em Portugal?</Title>
                </div>
                <div className={styles.dropdown}>
                    <Suspense fallback={<Dropdown placeHolder='Comida' values={[]} onChange={setDish} action={'dish'}/>}>
                      <Dishes onChange={setDish} />
                    </Suspense>
                </div>
                <div className={styles.dropdown}>
                  <Suspense fallback={<Dropdown placeHolder='Localização' values={[]} onChange={setCity} action={'food'} />}>
                    <Cities onChange={setCity} />
                  </Suspense>
                </div>
                <div className={styles.button}>
                    {error && <Error>Escolha pelo menos uma localização ou comida.</Error>}
                    <Button onClick={handleSubmit} primary={true} >Procurar Restaurantes</Button>
              </div>
            </div>
        </div>
      </>
       
    );
};

export default Home;