import { FunctionComponent, useState, useEffect } from 'react'
import { getDishes } from '../../bin/api';


type Props = {
  onChange: (params: any) => any;
};

import Dropdown from '../../components/dropdown';

const Dishes: FunctionComponent<Props> = ({onChange}) => {
    const  [dishes, setDishes] = useState([]);

    useEffect(() => {
        let mounted = true;
        getDishes()
        .then(data => {
          if(mounted) {
            setDishes(data);
          }
        });
        return () => {
         mounted = false;
       }
      }, [])

    return (
        <Dropdown placeHolder='Comida' values={dishes} onChange={onChange} action={'food'}/>       
    );
};

export default Dishes;