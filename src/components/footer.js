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
            website
          }
        }
      }
    }
  `)

  const { github, telegram, website } = data.site.siteMetadata?.social

  return (
    <footer>
      <p>
        © {new Date().getFullYear()},{` `}
        All rights reserved.
      </p>
      <div>
        <a href={website} target="_blank">
          website
        </a>
        {' • '}
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
