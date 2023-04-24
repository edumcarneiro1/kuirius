import type { FunctionComponent } from 'react'
import styles from './logo.module.scss'
import { useRouter } from 'next/router'


type Props = {
    children: string;
    slogan?: string;
    style?: string;
}

const Logo: FunctionComponent<Props> = ({children, slogan}) => {
    const styleType = slogan  ? styles.strong : styles.light;

    const router = useRouter();

    const handleHome = () => {
        router.push('/');
    }
    
    return  (
        <div className={styles.logo}>
            <h1 className={styleType} onClick={handleHome}>{children}</h1>
            <h3>{slogan}</h3>
        </div>
    )
};

export default Logo;