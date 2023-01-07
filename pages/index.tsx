import Head from 'next/head';

import Home from '../modules/home';

import {ICity, IDish} from '../types/types';
import { FunctionComponent } from 'react';

export async function getServerSideProps() {

  const resCities = await fetch(`http://localhost:3000/api/cities`);
  const cities = await resCities.json();

  const resDishes = await fetch(`http://localhost:3000/api/dishes`);
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
    </>
  )
}

export default Index;
