import Head from 'next/head';

import Home from '../modules/home';
import Script from 'next/script';

import {ICity, IDish} from '../types/types';
import { FunctionComponent } from 'react';

import{ Analytics } from '@vercel/analytics/react';

export async function getServerSideProps() {

  const resCities = await fetch(`${process.env.HOST}/api/cities`);
  const cities = await resCities.json();

  const resDishes = await fetch(`${process.env.HOST}/api/dishes`);
  const dishes = await resDishes.json();

  return {
    props: {
      cities: cities.response,
      dishes: dishes.response
    }, 
  }
}

type Props = {
  dishes: IDish[];
  cities: ICity[];
};



const Index: FunctionComponent<Props> = ({cities, dishes})  => {
  return (
    <>
      <Head>
        <title>Kuirius - Pelo amor à comida e bons restaurantes</title>
        <meta name="description" content="Encontre na nossa comunidade os locais onde comer bem por todo Portugal..." />
        <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home dishes={dishes} cities={cities}></Home>
      <Analytics />
      <Script src="/hotjar.js"></Script>
    </>
  )
}

export default Index;
