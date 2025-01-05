import { ToastProvider } from "@/components/ui/toast";
import { AppProps } from "next/app";
import '@/styles/globals.css'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

