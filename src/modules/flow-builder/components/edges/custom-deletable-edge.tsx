import type { EdgeProps } from '@xyflow/react'
import { BezierEdge, EdgeLabelRenderer, getBezierPath, useReactFlow } from '@xyflow/react'

export default function CustomDeletableEdge(props: EdgeProps) {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props

  const { setEdges } = useReactFlow()

  const [
    _,
    labelX,
    labelY,
  ] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <>
      <BezierEdge {...props} />
      <EdgeLabelRenderer>
        <button
          type="button"
          className="group pointer-events-auto absolute size-5 flex items-center justify-center rounded-full bg-dark-500 text-red-300 transition-colors transition-shadow hover:(bg-dark-200 ring-1 ring-dark-100)"
          style={{
            transform: `translate(${labelX}px, ${labelY}px) translate(-50%, -50%)`,
          }}
          onClick={() => setEdges(edges => edges.filter(edge => edge.id !== id))}
        >
          <div className="i-maki:cross size-3 transition group-hover:(scale-80 text-red-50)" />
        </button>
      </EdgeLabelRenderer>
    </>
  )
}
