import type { FunctionComponent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router'
import styles from './card.module.scss';
import classNames from 'classnames';


import { IRestaurantDish, INTERACTION } from '../../types/types';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {  faLocationArrow, faThumbsUp, faThumbsDown, faShare, faEye} from '@fortawesome/free-solid-svg-icons'

import Button from '../button';

type Props = {
    position: number;
    dish: IRestaurantDish;
    setNotification: (params: any) => any;
    setInteraction: (id: any, interaction: any) => any;
};

const faPropIcon = faLocationArrow as IconProp;
const faPropUpIcon = faThumbsUp as IconProp;
const faPropDownIcon = faThumbsDown as IconProp;
const faPropShareIcon = faShare as IconProp;
const faPropEye = faEye as IconProp;


const Card: FunctionComponent<Props> = ({position, dish, setNotification, setInteraction}) => {
    const likedClassname = dish.liked ? styles.like : '';
    const disLikedClassname = dish.disliked ? styles.dislike : '';

    const router = useRouter();

    const handleShare = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST}/${router.asPath}#${dish._id}`);
        setNotification('O link do restaurante foi copiado para o seu clipboard');
    } 

    const formattedDate = dish.dateOfCreation !== '' ? new Date(parseInt(dish.dateOfCreation)) : new Date();

    const authorBlock = dish.author && dish.author !== '' ? 
            <p>{`${dish.author} - ${formattedDate.toLocaleDateString('en-GB')}`}</p> :  
            <p>{`Adicionado em ${formattedDate.toLocaleDateString('en-GB')}`}</p>;

    
    return  (
        <div id={dish._id} className={styles.container}>
            <div className={styles.details}>
                <div className={styles.left}>
                    <h2>{`${(position + 1).toString()}º ${dish.name}` }</h2>        
                </div>
                <div className={styles.right}>
                    {dish.link && 
                        <a href={dish.link} target="_blank" rel='noreferrer'>
                                <FontAwesomeIcon icon={faPropEye} className={styles.icon}/>
                                Visitar
                        </a>
                    }
                </div>
            </div>
            <h3>{`Gostos: ${dish.score}`}</h3>
            {authorBlock}
            <div className={ styles.actions }>
                <a href="#" className={likedClassname} onClick={(e) => {e.preventDefault();setInteraction(dish._id, INTERACTION.Like)}}>
                    <FontAwesomeIcon icon={faPropUpIcon} className={styles.icon}/>
                    Gosto
                </a>
                <a href="#" className={disLikedClassname}  onClick={(e) => {e.preventDefault();setInteraction(dish._id, INTERACTION.Dislike)}}>
                    <FontAwesomeIcon icon={faPropDownIcon} className={styles.icon}/>
                    Não Gosto
                </a>
                <a href="#" onClick={handleShare}>
                    <FontAwesomeIcon icon={faPropShareIcon} className={styles.icon}/>
                    Partilhar
                </a>
            </div>
        </div>
    )
};
export default Card;


