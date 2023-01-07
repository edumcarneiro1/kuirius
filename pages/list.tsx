import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';

import styles from './list.module.scss';

import { IDish } from '../types/types';

import Layout from '../modules/layout';
import Title from '../components/title';
import List from '../modules/list';


export async function getServerSideProps({query}) {

 const { city,dish } = query;

  const cityName = '';
  const dishName = '';
  const dishes = [];

  return {
    props: {
      city: cityName,
      dish: dishName,
      dishes: dishes
    }, 
  }
}

type Props = {
    city: string;
    dish: string;
    dishes: IDish[];
}

const Index: FunctionComponent<Props> = ({city, dish, dishes})  => {
    const router = useRouter();

    return (
        <Layout>
            <div className={styles.title}>
                <Title>{`Onde comer a melhor ${dish} no ${city}?`}</Title>
                <List dishes={dishes}/>
            </div>
        </Layout>
    )
}

export default Index;
