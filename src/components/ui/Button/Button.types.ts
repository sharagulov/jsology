type BaseProps = {
  children: React.ReactNode
  variant?: 'default' | 'ghost' | 'filler'
  disabled?: boolean
  icon?: 'right' | 'down' | 'arrow'
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