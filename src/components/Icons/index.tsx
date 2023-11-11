import { useTheme } from 'styled-components'
import Alert from './icons/ic-alert.svg'
import ArrowLeft from './icons/ic-arrow-left.svg'
import ArrowRight from './icons/ic-arrow-right.svg'
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
import Doksi from './icons/symbol_gray.svg'

const IconObject = {
  Alert,
  ArrowLeft,
  ArrowRight,
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
  Doksi,
} as { [key: string]: any }

export type IconNameType =
  | 'Alert'
  | 'ArrowLeft'
  | 'ArrowRight'
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
  | 'Doksi'

interface IconProps {
  name: IconNameType
  width?: string
  height?: string
  fill?: string
}

function Icons(props: IconProps) {
  const theme = useTheme()
  const {
    name,
    width = '26px',
    height = '26px',
    fill = theme.color.gray[600],
  } = props
  const SVG = IconObject[name]

  return <SVG width={width} height={height} fill={fill} />
}

export default Icons
