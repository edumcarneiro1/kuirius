import { FunctionComponent } from 'react'
import Head from 'next/head';
import styles from './layout.module.scss'


import Logo from '../../components/logo';

type Props = {
  children: any;
};



const Layout: FunctionComponent<Props> = ({children}) => {

    return (
      <>
        <Head>
          <title>Kuirius</title>
          <meta name="description" content="Pelo amor à comida e restauração" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.container}>
           <div className={styles.page}>
                <Logo>Kuirius</Logo>
                {children} 
           </div>
       </div>
      </>
       
    );
};

export default Layout;