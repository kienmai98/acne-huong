import {
  LazyLoadImage,
  type LazyLoadImageProps,
} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

export interface LazyImageProps extends LazyLoadImageProps {}

const LazyImage = ({ effect = 'blur', ...rest }: LazyImageProps) => {
  return <LazyLoadImage effect={effect} {...rest} />
}

export default LazyImage
