import * as React from 'react';
import { IconButton, mergeStyleSets, Modal } from 'office-ui-fabric-react';
import styles from './modal.module.scss';
import { IWarningModal } from '../../Hooks/warning.modal.hook';



export const WarningModal: React.FC<IWarningModal> = ({isOpen, status, user, message, onClose}) => {
  const classNames = mergeStyleSets({
    container: {
      display: 'flex',
      height: '270px',
      width: '450px',
    },
  });
  
  return (
    <Modal
        isOpen={isOpen}
        onDismiss={onClose}
        isBlocking={true}
        containerClassName={classNames.container}
    >
        <div className={styles.header}>
            <span className={styles.reprovado}>
                {status}
            </span>
            <IconButton
                iconProps={{ iconName: 'ChromeClose' }}
                onClick={onClose}
                className={styles.closebutton}
            />
        </div>
        <div className={styles.contentmodal}>
            <span className={styles.title}>{user} </span>
            <span className={styles.text}>
                {message} 
            </span>
        </div>
    </Modal> 
  );        
};
