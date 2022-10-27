import * as React from 'react';
import {
  DetailsList,
  IColumn,
  IDetailsListProps,
  SelectionMode,
  Spinner,
  SpinnerSize,
  DetailsRow,
  IDetailsRowStyles
} from 'office-ui-fabric-react';
import styles from './table.module.scss';

interface ITable {
  columns: IColumn[];
  cards: IDetailsListProps['items'];
  loaded: boolean;
  textNotCard: string;
}

const onRenderRow:IDetailsListProps['onRenderRow'] = (props) => {
  const customStyles: Partial<IDetailsRowStyles> = {};
    if (props) {
      if (props.itemIndex % 2 === 0) {
        customStyles.root = { backgroundColor: '#faf9f8' };
      }
      return <DetailsRow {...props} styles={customStyles} />;
    }
};

export const Table: React.FC<ITable> = (props) => {
  return (
    <div className={styles.container}>
      <DetailsList
        columns={props.columns}
        items={props.cards}
        selectionMode={SelectionMode.none}
        onRenderRow={onRenderRow}
      />
      {props.cards.length === 0 && (
        <span className={styles.message}>{props.loaded ? `${props.textNotCard}` : <Spinner size={SpinnerSize.large} />
        }</span>
      )}
    </div>
  );
};
