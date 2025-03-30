type BaseProps = {
  children?: React.ReactNode
  variant?: 'default' | 'ghost' | 'filler' | 'square'
  disabled?: boolean
  icon?: 'right' | 'down' | 'arrow' | 'drag'
}

type ClickProps = BaseProps & {
  type: 'click'
  onClick: () => void
}


type MenuProps = BaseProps & {
  type: 'menu'
  menuItems: string[]
}


export type ButtonProps = ClickProps | MenuProps