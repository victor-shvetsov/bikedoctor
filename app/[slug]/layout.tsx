// =============================================================================
// Shared Public Layout for [slug] pages (Block 0.3)
// =============================================================================
// Minimal wrapper -- navbar + footer are rebuilt in Block 1.4.
// For now this is a pass-through layout that ensures consistent structure.
// =============================================================================

export default function SlugLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navbar placeholder -- built in Block 1.4 */}
      <div className="flex-1">{children}</div>
      {/* Footer placeholder -- built in Block 1.4 */}
    </div>
  )
}
