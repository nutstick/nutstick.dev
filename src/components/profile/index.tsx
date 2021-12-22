import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { avatar, container, name } from './style.css'

const Profile: React.FC = () => {
  const { site } = useStaticQuery<GatsbyTypes.ProfileQuery>(graphql`
    query Profile {
      site {
        siteMetadata {
          author {
            name
            avatar
            bio
          }
        }
      }
    }
  `)

  return (
    <div className={container}>
      <img
        className={avatar}
        src={site?.siteMetadata?.author?.avatar}
        alt="Nuttapat Kirawittya"
      />
      <h2 className={name}>{site?.siteMetadata?.author?.name}</h2>
      <div>{site?.siteMetadata?.author?.bio}</div>
    </div>
  )
}

export default Profile
