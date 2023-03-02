import Head from 'next/head';

import Home from '../modules/home';
import Script from 'next/script';

import {ICity, IDish} from '../types/types';
import { FunctionComponent } from 'react';

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
        <title>Kuirius</title>
        <meta name="description" content="Pelo amor à comida e restauração" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home dishes={dishes} cities={cities}></Home>
      <Script src="/hotjar.js"></Script>
    </>
  )
}

export default Index;
