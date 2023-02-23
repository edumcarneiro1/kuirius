import type { FunctionComponent } from 'react';
import styles from './card.module.scss';


import { IRestaurantDish } from '../../types/types';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {  faLocationArrow, faThumbsUp, faThumbsDown, faShare} from '@fortawesome/free-solid-svg-icons'


type Props = {
    position: number;
    dish: IRestaurantDish;
};


const faPropIcon = faLocationArrow as IconProp;
const faPropUpIcon = faThumbsUp as IconProp;
const faPropDownIcon = faThumbsDown as IconProp;
const faPropShareIcon = faShare as IconProp;


const Card: FunctionComponent<Props> = ({position, dish}) => {

    return  (
        <div className={styles.container}>
            <div className={styles.details}>
                <div className={styles.left}>
                    <h5>{`${(position + 1).toString()}º ${dish.name}` }</h5>
                    <p>{`Pontuação: ${dish.score}`}</p>
                </div>
                <div className={styles.right}>
                    <a href={dish.link} target='_blank' role={'button'} rel="noreferrer">
                        <FontAwesomeIcon icon={faPropIcon} className={styles.icon}/>
                        Visitar
                    </a>
                    <p className={styles.bold}>Criado por:</p>
                    <p>{`${dish.author} - ${dish.dateOfCreation}`}</p>
                </div>
            </div>
            <div className={styles.actions}>
                <a href="#">
                    <FontAwesomeIcon icon={faPropUpIcon} className={styles.icon}/>
                    Gosto
                </a>
                <a href="#">
                    <FontAwesomeIcon icon={faPropDownIcon} className={styles.icon}/>
                    Não Gosto
                </a>
                <a href="#">
                    <FontAwesomeIcon icon={faPropShareIcon} className={styles.icon}/>
                    Partilhar
                </a>
            </div>
        </div>
    )
};

export default Card;