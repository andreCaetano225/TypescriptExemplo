import * as React from 'react';
import styled from './click.module.scss';

export interface INameProps {
    IconClick: string;
    corText: string;
    textIcon: string;
}

export const DetailsClick: React.FC<INameProps> = (props) => {
    return (
        <>
            <div className={styled.appClick}>
                <div>
                    <img src={props.IconClick} alt="" />
                    <h1 style={ props.corText ? {color: `${props.corText}`} : {color: '#FFF'}}>{props.textIcon}</h1>
                </div>
            </div>
        </>
    );
};