import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';

import styles from './dish.module.scss';
import Layout from '../modules/layout';
import Title from '../components/title';

import Dish from '../modules/dish';




const Index: FunctionComponent<{}> = ()  => {
    const router = useRouter();

    const handleAddDish = (dish) => {
        alert(dish);
    }

    return (
        <Layout>
            <div className={styles.title}>
                <Title>Adicione o seu prato favorito</Title>
                <Dish onComplete={handleAddDish}/>
            </div>
        </Layout>
    )
}

export default Index;
