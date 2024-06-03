import { Input, InputProps } from '@mantine/core'
import classes from './Input.module.css'

interface InputBase extends InputProps {
  value: string
  placeholder?: string
  pointer?: boolean
  rightSection?: React.ReactNode
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputComponent = ({ ...rest }: InputBase) => <Input classNames={classes} {...rest} />

export default InputComponent
