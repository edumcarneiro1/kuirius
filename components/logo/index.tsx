import type { FunctionComponent } from 'react'
import styles from './logo.module.scss'

type Props = {
    children: string;
    slogan?: string;
}

const Logo: FunctionComponent<Props> = ({children, slogan}) => {
    const styleType = slogan  ? styles.strong : styles.light;
    
    return  (
        <div className={styles.logo}>
            <h2 className={styleType}>{children}</h2>
            <h5>{slogan}</h5>
        </div>
    )
};

export default Logo;