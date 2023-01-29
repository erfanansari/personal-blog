import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'

const Footer = () => {
  const data = useStaticQuery(graphql`
    query SocialQuery {
      site {
        siteMetadata {
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const { twitter, github } = data.site.siteMetadata?.social || {}

  return (
    <footer>
      <p>
        © {new Date().getFullYear()},{` `}
        All rights reserved.
      </p>
      <div>
        <a
          href={`https://twitter.com/${twitter}`}
          target="_blank"
          rel="noreferrer"
        >
          twitter
        </a>
        {' • '}
        <a
          href={`https://github.com/${github}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
      </div>
    </footer>
  )
}

export default Footer
