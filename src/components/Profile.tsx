import React from 'react'
import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4em;
`

const Avatar = styled.img`
  border-radius: 1rem;
  width: 50%;
  max-width: 220px;
`

const Name = styled.h2`
  @media (max-width: ${({ theme: { breakpoints, getEmSize } }) =>
      getEmSize(breakpoints.md)}em) {
    font-size: ${({ theme: { dimensions, getEmSize } }) =>
      getEmSize(dimensions.fontSize.large)}em;
  }
`

const Bio = styled.div``

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
    <Container>
      <Avatar src={site?.siteMetadata?.author?.avatar} />
      <Name>{site?.siteMetadata?.author?.name}</Name>
      <Bio>{site?.siteMetadata?.author?.bio}</Bio>
    </Container>
  )
}

export default Profile
