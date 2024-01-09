import { useTheme } from 'styled-components'
import Alert from './icons/ic-alert.svg'
import ArrowLeft from './icons/ic-arrow-left.svg'
import ArrowRight from './icons/ic-arrow-right.svg'
import OpenedBook from './icons/ic-opend-book.svg'
import Book from './icons/ic-book.svg'
import Calendar from './icons/ic-calendar.svg'
import CheckActive from './icons/ic-check-active.svg'
import CheckDefault from './icons/ic-check-default.svg'
import Check from './icons/ic-check.svg'
import ChevronDown from './icons/ic-chevron-down.svg'
import ChevronLeft from './icons/ic-chevron-left.svg'
import ChevronRight from './icons/ic-chevron-right.svg'
import ChevronUp from './icons/ic-chevron-up.svg'
import Close from './icons/ic-close.svg'
import CloseCircle from './icons/ic-close-circle.svg'
import DropDown from './icons/ic-dropdown.svg'
import EyeClosed from './icons/ic-eye-closed.svg'
import EyeOpen from './icons/ic-eye-open.svg'
import HeartActive from './icons/ic-heart-active.svg'
import HeartDefault from './icons/ic-heart-default.svg'
import Home from './icons/ic-home.svg'
import Lightning from './icons/ic-lightning.svg'
import Menu from './icons/ic-menu.svg'
import New from './icons/ic-new.svg'
import Search from './icons/ic-search.svg'
import User from './icons/ic-user.svg'
import Content from './icons/ic-content.svg'
import Setting from './icons/ic-setting.svg'
import Subscription from './icons/ic-subscription.svg'
import Library from './icons/ic-library.svg'
import Plus from './icons/ic-plus.svg'
import Minus from './icons/ic-minus.svg'
import Doksi from './icons/ic-doksi.svg'

const IconObject = {
  Alert,
  ArrowLeft,
  ArrowRight,
  OpenedBook,
  Book,
  Calendar,
  CheckActive,
  CheckDefault,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Close,
  CloseCircle,
  DropDown,
  EyeClosed,
  EyeOpen,
  HeartActive,
  HeartDefault,
  Home,
  Lightning,
  Menu,
  New,
  Search,
  User,
  Content,
  Setting,
  Subscription,
  Library,
  Plus,
  Minus,
  Doksi,
} as { [key: string]: any }

export type IconNameType =
  | 'Alert'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'OpenedBook'
  | 'Book'
  | 'Calendar'
  | 'CheckActive'
  | 'CheckDefault'
  | 'Check'
  | 'ChevronDown'
  | 'ChevronLeft'
  | 'ChevronRight'
  | 'ChevronUp'
  | 'Close'
  | 'CloseCircle'
  | 'DropDown'
  | 'EyeClosed'
  | 'EyeOpen'
  | 'HeartActive'
  | 'HeartDefault'
  | 'Home'
  | 'Lightning'
  | 'Menu'
  | 'New'
  | 'Search'
  | 'User'
  | 'Content'
  | 'Setting'
  | 'Subscription'
  | 'Library'
  | 'Plus'
  | 'Minus'
  | 'Doksi'

interface IconProps {
  name: IconNameType
  width?: string
  height?: string
  onClick?: () => void
  color?: string
}

function Icons(props: IconProps) {
  const theme = useTheme()
  const {
    name,
    width = '26px',
    height = '26px',
    color = theme.color.gray[600],
    onClick,
  } = props
  const SVG = IconObject[name]

  const handleClick = () => {
    if (onClick) onClick()
  }

  return (
    <SVG
      width={width}
      height={height}
      fill={color}
      onClick={handleClick}
      style={{ cursor: onClick ? 'pointer' : 'unset' }}
    />
  )
}

export default Icons
