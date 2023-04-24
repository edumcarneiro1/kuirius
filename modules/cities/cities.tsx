import { FunctionComponent, useState, useEffect } from 'react'
import { getCities } from '../../bin/api';


type Props = {
  onChange: (params: any) => any;
};

import Dropdown from '../../components/dropdown';

const Cities: FunctionComponent<Props> = ({onChange}) => {
    const  [cities, setCities] = useState([]);

    useEffect(() => {
        let mounted = true;
        getCities()
        .then(data => {
          if(mounted) {
            setCities(data);
          }
        });
        return () => {
         mounted = false;
       }
      }, [])

    return (
        <Dropdown placeHolder='Localização' values={cities} onChange={onChange} action={'food'}/>       
    );
};

export default Cities;