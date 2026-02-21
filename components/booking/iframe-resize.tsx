"use client"

import { useEffect } from "react"

/**
 * Sends the document height to the parent window via postMessage.
 * The parent page (e.g. Webflow) listens for these messages and
 * resizes the iframe accordingly.
 *
 * Message format: { type: "bikedoctor-resize", height: number }
 */
export function IframeResize() {
  useEffect(() => {
    function sendHeight() {
      const height = document.documentElement.scrollHeight
      window.parent.postMessage({ type: "bikedoctor-resize", height }, "*")
    }

    // Send immediately + on resize + on mutation
    sendHeight()

    const observer = new MutationObserver(sendHeight)
    observer.observe(document.body, { childList: true, subtree: true, attributes: true })

    window.addEventListener("resize", sendHeight)

    // Periodic fallback (for animations, etc.)
    const interval = setInterval(sendHeight, 500)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", sendHeight)
      clearInterval(interval)
    }
  }, [])

  return null
}
