/// <reference types="vite/client" />

export {};

declare global {
  interface Window {
    solana: any;
    phantom: any
  }
}
