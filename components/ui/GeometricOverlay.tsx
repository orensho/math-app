import clsx from 'clsx'

interface GeometricOverlayProps {
  variant?: 'circles' | 'squares' | 'triangles' | 'hexagons'
  className?: string
}

export default function GeometricOverlay({
  variant = 'circles',
  className
}: GeometricOverlayProps) {
  const patterns = {
    circles: (
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <pattern id="circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="15" fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circles)" />
      </svg>
    ),
    squares: (
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <pattern id="squares" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect x="5" y="5" width="30" height="30" fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#squares)" />
      </svg>
    ),
    triangles: (
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <pattern id="triangles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <polygon points="20,5 35,35 5,35" fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#triangles)" />
      </svg>
    ),
    hexagons: (
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <pattern id="hexagons" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse">
          <polygon points="28,5 50,20 50,50 28,65 6,50 6,20" fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    )
  }

  return (
    <div className={clsx('geometric-overlay', className)}>
      <div className="absolute inset-0 text-primary-500 opacity-5">
        {patterns[variant]}
      </div>
    </div>
  )
}
