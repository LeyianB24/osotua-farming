interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  borderRadius?: string | number
}

export default function Skeleton({
  className = "",
  width,
  height,
  borderRadius,
}: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="glass-dark p-6 rounded-2xl space-y-4">
      <Skeleton height="180px" className="w-full rounded-xl" />
      <Skeleton height="24px" className="w-3/4" />
      <Skeleton height="16px" className="w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton height="20px" className="w-1/3" />
        <Skeleton height="36px" className="w-24 rounded-lg" />
      </div>
    </div>
  )
}
