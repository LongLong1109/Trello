import { Button, ButtonProps } from '@mantine/core'
import classes from './Button.module.css'

interface ButtonBase extends ButtonProps {
  name: string
  isLoading?: boolean
  leftSection?: React.ReactNode
  onClick: () => void
}

const ButtonComponent = ({ name, isLoading, ...rest }: ButtonBase) => {
  return (
    <Button classNames={classes} loading={isLoading} {...rest}>
      {name}
    </Button>
  )
}

export default ButtonComponent
