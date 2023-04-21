import { FunctionComponent } from 'react'
import Head from 'next/head';
import Script from 'next/script';
import styles from './layout.module.scss'
import Image from 'next/image';


import Logo from '../../components/logo';

type Props = {
  children: any;
};



const Layout: FunctionComponent<Props> = ({children}) => {

    return (
      <>
        <Head>
          <title>Kuirius</title>
          <meta name="description" content="Pelo amor à comida e bons restaurantes" />
          <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1.0, user-scalable=no" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.container}>
          <div className={styles.image}>
                <Image 
                src="/home.png"
                alt="Home Layoyt"
                width={177}
                height={196}
              />
            </div>
           <div className={styles.page}>
                <Logo>Kuirius</Logo>
                {children} 
           </div>
       </div>
       <Script src="/hotjar.js"></Script>
      </>
       
    );
};

export default Layout;