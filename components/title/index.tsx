import type { FunctionComponent } from 'react'
import styles from './title.module.scss'

type Props = {
    children: string;
}

const Title: FunctionComponent<Props> = ({children}) => {
    return  <h3 className={styles.title}>{children}</h3>
};

export default Title;