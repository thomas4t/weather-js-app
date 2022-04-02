import React, { Suspense, useMemo } from 'react'
import styled, { system, SystemProps } from '@xstyled/styled-components'
import { useImage } from 'react-image'
import ErrorBoundary from './components/ErrorBoundary'

const StyledAvatar = styled.img`
  border-radius: 50%;
  ${system};
`
type Props = SystemProps & {
  src?: string
  alt: string
  fallbackUrl?: string
  fallbackElement?: React.ReactChild
}

type ImageProps = SystemProps & {
  imageSources: string[]
  alt: string
}

const AvatarImage = ({ imageSources, ...props }: ImageProps): JSX.Element => {
  const { src } = useImage({
    srcList: imageSources,
  })
  return <StyledAvatar src={src} {...props} />
}

const Avatar = ({ src: imgSrc, fallbackUrl, fallbackElement, ...props }: Props): JSX.Element => {
  const imgSourcesMemorized = useMemo(() => [imgSrc || '', fallbackUrl || ''], [imgSrc, fallbackUrl])

  // If no fallbackUrl and no imgSrc was provided we don't have to attempt to load the image
  if (!imgSrc && !fallbackUrl && fallbackElement) return <>{fallbackElement}</>

  return (
    //  If it fails to load all images from imgSourcesMemorized array error is going to be thrown
    //  Error boundary will catch it and show fallback element or error message
    <ErrorBoundary onErrorChildren={fallbackElement || <>image error</>}>
      {/* When avatar image is loading it will show fallbackElement if it's defined or nothing in case it's not */}
      <Suspense fallback={fallbackElement || null}>
        <AvatarImage imageSources={imgSourcesMemorized} {...props} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default Avatar
