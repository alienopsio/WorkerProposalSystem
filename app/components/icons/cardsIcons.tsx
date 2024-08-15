import Image from 'next/image'

export const ByIcon = ({
  width,
  height
}: {
  width: number
  height: number
}) => {
  return (
    <Image
      src="/images/aw_wp-icon-by.svg"
      width={width}
      height={height}
      alt="By Icon"
    />
  )
}

export const IdIcon = ({
  width,
  height
}: {
  width: number
  height: number
}) => {
  return (
    <Image
      src="/images/aw_wp-icon-id.svg"
      width={width}
      height={height}
      alt="ID Icon"
    />
  )
}

export const TriangleIcon = ({
  width,
  height
}: {
  width: number
  height: number
}) => {
  return (
    <Image
      src="/images/aw_wp-icon-tlm.svg"
      width={width}
      height={height}
      alt="Triangle Icon"
    />
  )
}

export const DurationIcon = ({
  width,
  height
}: {
  width: number
  height: number
}) => {
  return (
    <Image
      src="/images/aw_wp-icon-duration.svg"
      width={width}
      height={height}
      alt="Duration Icon"
    />
  )
}

export const VotesIcon = ({
  width,
  height
}: {
  width: number
  height: number
}) => {
  return (
    <Image
      src="/images/aw_wp-icon-votes.svg"
      width={width}
      height={height}
      alt="Votes Icon"
    />
  )
}
