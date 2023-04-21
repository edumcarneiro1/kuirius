import { FunctionComponent, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from './dish.module.scss';
import Layout from '../modules/layout';
import Title from '../components/title';
import Loading from '../modules/loading';
import Success from '../modules/success';

import Dish from '../modules/dish';

import { IDish } from '../types/types';




const Index: FunctionComponent<{}> = ()  => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [status, setStatus] = useState('');

    const [message, setMessage] = useState('');

    const [id, setId] = useState('');

    const handleAddDish = (name) => {
        setLoading(true);

        const dish: IDish = {
            name: name
        };

        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/dishes`, {
            method: 'POST',
            body: JSON.stringify(dish)
            }
        )
        .then(response => response.json())
        .then( (result) => {
            setLoading(false);
            if (result.status === 'Success') {
                setId(result.response.id)
                setMessage('Obrigado pela sua contribuição');
                setStatus('success');
            } else {
                setMessage('Ops, algo correu mal, tente novamente');
                setStatus('error');
            }
        })
        .catch((err) => {
            setMessage('Ops, algo correu mal, tente novamente');
            setStatus('error');
        });
    }

    useEffect(() => {
        setTimeout(()=> {
          if (status === 'success') {
            router.push(`/list?dish=${id}&city=`);
          } else {
            setStatus('');
            setMessage('')
          }
        }, 1000)
      }, [status]);


    const pageContent = status === 'success' || status === 'error' ?
                        <Success success={status === 'success'} message={message}/> : 
                        <>
                            <Title>Adicione o seu prato favorito</Title>
                            <Dish onComplete={handleAddDish}/>
                        </>
    return (
        <Layout>
            {loading && <Loading />}
            <div className={styles.title}>
                {pageContent}
            </div>
        </Layout>
    )
}

export default Index;
