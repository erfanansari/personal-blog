import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const Footer = () => {
  const data = useStaticQuery(graphql`
    query SocialQuery {
      site {
        siteMetadata {
          social {
            github
            telegram
          }
        }
      }
    }
  `)

  const github = data.site.siteMetadata?.social?.github
  const telegram = data.site.siteMetadata?.social?.telegram

  return (
    <footer>
      © {new Date().getFullYear()},{` `}
      All rights reserved.
      <div>
        <a
          href={`https://github.com/${github || ``}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
        {' • '}
        <a
          href={`https://t.me/${telegram || ``}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          telegram
        </a>
      </div>
    </footer>
  )
}

export default Footer
