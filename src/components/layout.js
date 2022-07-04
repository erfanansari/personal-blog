import * as React from 'react'
import { Link } from 'gatsby'
import Footer from './footer'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const header = isRootPath ? (
    <h1 className="main-heading">
      <Link to="/">{title}</Link>
      {/* <Link to="/">Erfan Ansari</Link> */}
    </h1>
  ) : (
    <Link className="header-link-home" to="/">
      {title}
    </Link>
  )

  const changeTheme = (
    <div className="change-theme-wrapper">
      <button aria-label="Activate light mode" title="Activate light mode">
        Dark
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
