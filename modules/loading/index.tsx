import { FunctionComponent, useEffect } from 'react';
import styles from './loading.module.scss';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {  faCircleNotch} from '@fortawesome/free-solid-svg-icons'
import "@fortawesome/fontawesome-svg-core/styles.css";


const faPropIcon = faCircleNotch as IconProp;

type Props = {
  children?: any;
};



const Loading: FunctionComponent<Props> = ({children}) => {

    useEffect(() => {
        document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      }
    }, []);

    return (
       <div className={styles.container}>
            <FontAwesomeIcon 
                icon={faPropIcon}  
                className={styles.iconLoading}
                spin
            />
       </div>
    );
};

export default Loading;