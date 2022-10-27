import * as React from 'react';
import {useEffect, useState} from 'react';
import styled from './header.module.scss';

export interface HeaderPropsCard{
    imgPerfil: string;
    BordaPerfil: string;
    ColorBorda: string;
}

const getBorda = (bordaPerfil:string)=>{
    switch (bordaPerfil){
        case 'Com borda redonda':
            return styled.BordaRedonda;
        case 'Sem borda redonda':
            return styled.NotBordaRedonda;
        case 'Com borda quadrada':
            return styled.BordaQuadrada;
        case 'Sem borda quadrada':
            return styled.NotBordaQuadrada;
    }
};

export const Header = (props: HeaderPropsCard) => {

    const [bordatype,setBordaType] = useState('');

    useEffect( () => {
        let currentBorda = getBorda(props.BordaPerfil);
        setBordaType(currentBorda);
    }, [props.BordaPerfil,bordatype]);

    return(
        
        <>
            <div>
                <header  className={bordatype} >

                    <div >
                        <img src={props.imgPerfil} alt="mundo"  />     
                    </div>    
                </header>
            </div>

        </>
    );
};