import type { FunctionComponent } from 'react'
import styles from './notification.module.scss'

type Props = {
    children: string;
    type: string;
}

const Notification: FunctionComponent<Props> = ({children, type}) => {
    return  <div className={styles.notification}>{children}</div>
};

export default Notification;