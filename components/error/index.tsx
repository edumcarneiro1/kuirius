import type { FunctionComponent } from 'react'
import styles from './error.module.scss'

type Props = {
    children: string;
}

const Error: FunctionComponent<Props> = ({children}) => {
    return  <p className={styles.error}>{children}</p>
};

export default Error;