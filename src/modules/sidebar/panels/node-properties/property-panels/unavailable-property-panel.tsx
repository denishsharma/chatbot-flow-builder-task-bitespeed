export default function UnavailableNodePropertyPanel() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 text-center">
      <div className="size-12 flex items-center justify-center rounded-full bg-dark-300">
        <div className="i-mynaui:info-triangle size-6 text-white" />
      </div>

      <div className="mt-4 text-balance font-medium">
        Unavailable Properties
      </div>

      <div className="mt-1 w-2.5/3 text-xs text-light-50/40 font-medium leading-normal">
        Either no properties are available for this node or the node is not selected.
      </div>

      <div className="mt-8 w-full text-xs text-light-50/40 font-medium italic">
        Select another node to view its properties.
      </div>
    </div>
  )
}
