import { Modal, FocusTrap, LoadingOverlay } from '@mantine/core'
import InputComponent from '../Input'
import classes from './Modal.module.css'

interface ModalProps {
  value: string
  open: boolean
  isLoading?: boolean
  onClose: () => void
  children: React.ReactNode
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ModalComponent = ({ value, open, isLoading, onClose, children, onChange }: ModalProps) => (
  <>
    <Modal
      classNames={classes}
      opened={open}
      onClose={onClose}
      title={<InputComponent variant='filled' value={value} onChange={onChange} size='lg' />}
      radius='lg'
      size='lg'
    >
      {isLoading ? (
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
      ) : null}
      <FocusTrap.InitialFocus />
      {children}
    </Modal>
  </>
)

export default ModalComponent
