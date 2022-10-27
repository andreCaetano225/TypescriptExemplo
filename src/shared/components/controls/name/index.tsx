import * as React from 'react';
import { IFieldImage } from 'shared/types/IFieldImage';
import styles from './name.module.scss';
import styled from './name.module.scss';

export interface INameProps {
    name: string;
    area: string;
    corname: string;
    corarea: string;
    FotoUser: IFieldImage;
}

export const Name: React.FC<INameProps> = (props) => {
    return (
        <>
        <div className={styled.divFoto}>
        {props.FotoUser?.Url ? (
            <>
                <img src={`${props.FotoUser?.Url}`} alt="Logo da empresa"/>
            </>
        ) : (
           null
        )}
            <div className={ props.FotoUser?.Url ? styled.appName : styled.appNameNotFoto  }>
                <div>
                    <h1 style={ props.corname ? {color: `${props.corname}`} : {color: '#FFF'}}>{props.name}</h1>
                    <p style={ props.corarea ? {color: `${props.corarea}`} : {color: '#FFF809'}}>{props.area}</p>
                </div>
            </div>
        </div>
        </>
    );
};