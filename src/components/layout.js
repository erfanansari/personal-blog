import * as React from 'react'
import { Link } from 'gatsby'
import Footer from './footer'
import { useState, useCallback, useLayoutEffect } from 'react'
import switchOffSound from '../sounds/switch-off.mp3'
import switchOnSound from '../sounds/switch-on.mp3'

const colors = {
  light: {
    '--color-primary': '#005b99',
    '--color-text': '#2e353f',
    '--color-text-light': '#4f5969',
    '--color-heading': '#1a202c',
    '--color-heading-h1': '#000',
    '--color-accent': '#d1dce5',
    '--color-background': '#fff',
  },
  dark: {
    '--color-primary': '#2ac3de',
    '--color-text': '#a9b1d6',
    '--color-text-light': '#c3c7d7',
    '--color-heading': '#93b0e9',
    '--color-heading-h1': '#fff',
    '--color-accent': '#bb9af7',
    '--color-background': '#1a1b26',
  },
}

const isBrowser = typeof window !== 'undefined'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const header = isRootPath ? (
    <h1 className="main-heading">
      <Link to="/">{title}</Link>
    </h1>
  ) : (
    <Link className="header-link-home" to="/">
      {title}
    </Link>
  )
  const selectedTheme = isBrowser && localStorage.getItem('theme')
  const isOSThemeDark = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  const [dark, setDark] = useState(
    selectedTheme != null ? selectedTheme === 'dark' : isOSThemeDark,
  )

  const changeMode = useCallback(() => {
    Object.keys(colors[dark ? 'dark' : 'light']).forEach(key => {
      document.documentElement.style.setProperty(
        key,
        colors[dark ? 'dark' : 'light'][key],
      )
    })
    document
      .querySelectorAll(
        ":not(pre) > code[class*='language-'], pre[class*='language-']",
      )
      .forEach(el => (el.style.filter = `invert(${dark ? 1 : 0})`))
  }, [dark])

  useLayoutEffect(() => {
    changeMode()
  }, [dark, changeMode])

  const offAudio = isBrowser ? new Audio(switchOffSound) : null
  const onAudio = isBrowser ? new Audio(switchOnSound) : null

  const changeTheme = (
    <div className="change-theme-wrapper">
      <button
        id="change-theme"
        onClick={() => {
          setDark(!dark)
          if (isBrowser) {
            localStorage.setItem('theme', dark ? 'light' : 'dark')
            if (dark) {
              onAudio.play()
            } else {
              offAudio.play()
            }
          }
        }}
        aria-label={`Activate ${dark ? 'light' : 'dark'} mode`}
        title={`Activate ${dark ? 'light' : 'dark'} mode`}
      >
        Go {dark ? 'Light' : 'Dark'}
      </button>
    </div>
  )

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        {header}
        {changeTheme}
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
