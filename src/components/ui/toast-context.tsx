import React, { createContext, useState, useCallback } from 'react'
import { Toast } from './toast'

type ToastProps = React.ComponentProps<typeof Toast>

interface ToastContextType {
  toast: (props: ToastProps) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = useCallback((props: ToastProps) => {
    setToasts((prevToasts) => [...prevToasts, props])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {toasts.map((toastProps) => (
        <Toast key={toastProps.id} {...toastProps} onClose={() => removeToast(toastProps.id)} />
      ))}
    </ToastContext.Provider>
  )
}

