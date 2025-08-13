import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import MoonIcon from '../../Icons/MoonIcon'
import SunIcon from '../../Icons/SunIcon'

const routes = [
	{ title: 'Home', icon: 'fas-solid fa-house', path: '/' },
	{ title: 'Sales', icon: 'chart-line', path: '/sales' },
	{ title: 'Costs', icon: 'chart-column', path: '/costs' },
	{ title: 'Payments', icon: 'wallet', path: '/payments' },
	{ title: 'Finances', icon: 'chart-pie', path: '/finances' },
	{ title: 'Messages', icon: 'envelope', path: '/messages' },
]

const bottomRoutes = [
	{ title: 'Settings', icon: 'sliders', path: '/settings' },
	{ title: 'Support', icon: 'phone-volume', path: '/support' },
]

const Sidebar = props => {

	let timeoutId
	const [color, setColor] = useState(props.color)
	const [isOpened, setIsOpened] = useState(true)
	const [isDisplayItem, setIsDisplayItem] = useState(false)
	const [activeTab, setActiveTab] = useState('/')
	const containerClassnames = classnames({ opened: isOpened })

	const goToRoute = path => {
		setActiveTab(path)
	}

	const toggleSidebar = () => {
		setIsOpened(!isOpened)
	}
	const handlerDisplayItem = () => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => {
			setIsDisplayItem(!isDisplayItem)
		}, 300)
	}
	const handleThemeColor = () => {
		setColor(color === 'dark' ? 'light' : 'dark')
	}
	return (
		<SidebarWrapper $theme={color} className={containerClassnames}>
			<LogoWrapper $isOpened={isOpened}>
				<LogoContainer
					$isDisplayItem={isDisplayItem}
					$isOpened={isOpened}
					$theme={color}
				>
					<img src={logo} alt='TensorFlow logo' />
					<Item $theme={color} className={isOpened ? '' : 'hidden'}>
						TensorFlow
					</Item>
				</LogoContainer>
				<ArrowSwitch
					className={isOpened ? '' : 'close'}
					onClick={() => {
						toggleSidebar()
						handlerDisplayItem()
					}}
				>
					<FontAwesomeIcon icon={'angle-left'} />
				</ArrowSwitch>
			</LogoWrapper>
			<BtnWrapper $isOpened={isOpened}>
				<BtnContainer>
					{routes.map(route => (
						<Btn
							$active={activeTab === route.path}
							$isOpened={isOpened}
							$isDisplayItem={isDisplayItem}
							$theme={color}
							key={route.title}
							onClick={() => {
								goToRoute(route.path)
							}}
						>
							<FontAwesomeIcon icon={route.icon} />
							<Item
								$active={activeTab === route.path}
								$theme={color}
								className={isOpened ? '' : 'hidden'}
							>
								{route.title}
							</Item>
						</Btn>
					))}
				</BtnContainer>
				<BtnContainer>
					<BtnTheme
						onClick={handleThemeColor}
						$isOpened={isOpened}
						$isDisplayItem={isDisplayItem}
					>
						{color === 'dark' ? <SunIcon /> : <MoonIcon />}
					</BtnTheme>
					{bottomRoutes.map(route => (
						<Btn
							$active={activeTab === route.path}
							$isOpened={isOpened}
							$isDisplayItem={isDisplayItem}
							$theme={color}
							key={route.title}
							onClick={() => {
								goToRoute(route.path)
							}}
						>
							<FontAwesomeIcon icon={route.icon} />
							<Item
								$active={activeTab === route.path}
								$theme={color}
								className={isOpened ? '' : 'hidden'}
							>
								{route.title}
							</Item>
						</Btn>
					))}
				</BtnContainer>
			</BtnWrapper>
		</SidebarWrapper>
	)
}

Sidebar.propTypes = {
	color: PropTypes.string,
}

const SidebarWrapper = styled.div`
	width: 48px;
	background-color: ${props =>
		props.$theme === 'dark'
			? 'var(--color-sidebar-background-dark-default)'
			: 'var(--color-sidebar-background-light-default)'};
	padding: 24px;
	height: calc(100% - 48px);
	border-top-right-radius: 24px;
	border-bottom-right-radius: 24px;
	border-right: 2px solid #404040;
	transition: all 0.7s ease;

	&:hover {
		background-color: ${props =>
			props.$theme === 'dark'
				? 'var(--color-sidebar-background-dark-hover)'
				: 'var(--color-sidebar-background-light-hover)'};
	}
	&.opened {
		background-color: ${props =>
			props.$theme === 'dark'
				? 'var(--color-sidebar-background-dark-active)'
				: 'var(--color-sidebar-background-light-active)'};
		width: 150px;
		padding: 24px;
	}
`

const LogoWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	position: relative;
	& img {
		width: 48px;
		height: 48px;
	}
`
const LogoContainer = styled.div`
	overflow: hidden;
	display: flex;
	gap: 10px;
	align-items: center;
	width: 100%;
	transition: all 0.25s linear;

	padding-left: ${props =>
		props.$isDisplayItem ? '0' : props.$isOpened ? '0' : '13px'};

	& span {
		color: ${props =>
			props.$theme === 'dark'
				? 'var(--color-text-logo-dark-default)'
				: 'var(--color-text-logo-light-default)'};
	}
`
const BtnWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: calc(100% - 98px);
	padding-top: 50px;
	overflow: hidden;
`
const BtnTheme = styled.button`
	transition: all 0.25s linear;
	background-color: transparent;
	border: none;
	width: fit-content;
	margin-left: ${props =>
		props.$isDisplayItem
			? '12px!important'
			: props.$isOpened
			? '12px'
			: '25px'};
	cursor: pointer;
`
const BtnContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	& svg{
		
	}
`

const ArrowSwitch = styled.div`
	border-radius: 50%;
	width: 24px;
	height: 24px;
	cursor: pointer;
	background-color: #e2e8ed;
	flex-shrink: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 50%;
	transform:  translateY(-50%);
	right: -36px;
	transition: all 0.3s ease;
	& svg{
		transition: all 0.3s ease;
		transform: rotate(0deg);
		}
	&.close{
		right: -66px;
		& svg{
		transition: all 0.5s ease;
		transform: rotate(180deg);
		}
	}
	& path {
		fill: #000;

	}
`
const Btn = styled.button`
	display: flex;
	gap: 20px;
	align-items: center;
	cursor: pointer;

	width: 100%;
	transition: all 0.25s linear;
	border-radius: 15px;
	background-color: ${props =>
		props.$theme === 'dark'
			? props.$active
				? 'var(--color-button-background-dark-active)'
				: 'var(--color-button-background-dark-default)'
			: props.$active
			? 'var(--color-button-background-light-active)'
			: 'var(--color-button-background-light-default)'};
	padding: 10px 10px 10px
		${props =>
			props.$isDisplayItem ? '12px' : props.$isOpened ? '12px' : '25px'};
	border: none;

	& svg {
		width: 24px;
		height: 24px;
		color: ${props =>
				props.$theme === 'dark'
					? props.$active
						? 'var(--color-text-dark-active)'
						: 'var(--color-text-dark-hover)'
					: props.$active
					? 'var(--color-text-light-active)'
					: 'var(--color-text-light-hover)'};
	}

	&:hover {
		opacity: 0.8;

		& span {
			color: ${props =>
				props.$theme === 'dark'
					? props.$active
						? 'var(--color-text-dark-active)'
						: 'var(--color-text-dark-hover)'
					: props.$active
					? 'var(--color-text-light-active)'
					: 'var(--color-text-light-hover)'};
		}
	}
`

const Item = styled.span`
	opacity: 1;
	transition: opacity 0.3s ease;
	color: ${props =>
		props.$theme === 'dark'
			? props.$active
				? 'var(--color-text-dark-active)'
				: 'var(--color-text-dark-default)'
			: props.$active
			? 'var(--color-text-light-active)'
			: 'var(--color-text-light-default)'};

	&.hidden {
		opacity: 0;
	}
`
export default Sidebar
