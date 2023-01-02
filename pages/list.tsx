import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';

import styles from './list.module.scss';

import { IDish } from '../bin/types';

import Layout from '../modules/layout';
import Title from '../components/title';
import List from '../modules/list';


export async function getServerSideProps({query}) {

 const { city,dish } = query;

  return {
    props: {
      city: 'Porto',
      dish: 'Francesinha',
      dishes: [
        {id: 1, restaurant: 'Cufra', score: '2062', author: 'Eduardo Carneiro', dateOfCreation: '23/03/22', link: 'http://www.google.com'},
        {id: 2, restaurant: 'Plano B', score: '1502', author: 'Eduardo Carneiro', dateOfCreation: '23/03/22', link: 'http://www.google.com'},
        {id: 3, restaurant: 'Brasão', score: '1031', author: 'Eduardo Carneiro', dateOfCreation: '23/03/22', link: 'http://www.google.com'},
        {id: 4, restaurant: 'Golfinho', score: '123', author: 'Eduardo Carneiro', dateOfCreation: '23/03/22', link: 'http://www.google.com'},
      ]
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
