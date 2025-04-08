import { Toaster } from 'sonner'

import { useApplicationState } from '~/stores/application-state'

export function ToasterModule() {
  const [isMobileView] = useApplicationState(s => [s.view.mobile])

  return (
    <Toaster
      richColors
      position={isMobileView ? 'top-center' : 'bottom-center'}
      theme="dark"
      gap={12}
      closeButton
      toastOptions={{
        classNames: {
          toast: 'rounded-xl w-full shadow-xl items-start gap-x-2',
          title: 'text-sm font-medium leading-none',
          description: 'op-80 leading-snug mt-1',
          icon: 'shrink-0',
          success: '[--success-border:theme(colors.teal.900)] [--success-bg:theme(colors.dark.700)]',
          error: '[--error-border:theme(colors.red.900)] [--error-bg:theme(colors.dark.800)]',
        },
      }}
    />
  )
}
