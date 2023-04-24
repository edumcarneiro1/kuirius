import Head from 'next/head';

import Home from '../modules/home';
import Script from 'next/script';

import {ICity, IDish} from '../types/types';
import { FunctionComponent } from 'react';

import{ Analytics } from '@vercel/analytics/react';


const Index: FunctionComponent<{}> = ()  => {
  return (
    <>
      <Head>
        <title>Kuirius - Pelo amor à comida e bons restaurantes</title>
        <meta name="description" content="Encontre na nossa comunidade os locais onde comer bem por todo Portugal..." />
        <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=5.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home></Home>
      <Analytics />
      <Script src="/hotjar.js"></Script>
    </>
  )
}

export default Index;
