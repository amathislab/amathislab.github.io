export function Aurora() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden dark:block"
    >
      {/* Constrain aurora to content width */}
      <div className="relative mx-auto h-full max-w-7xl">
        {/* Top center glow */}
        <div className="absolute left-1/2 top-[-10%] h-[40rem] w-[45rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.sky.400/.25),transparent_60%)] blur-3xl" />

        {/* Left side glows (behind text) */}
        <div className="absolute left-[10%] top-[10%] size-[24rem] rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.violet.500/.15),transparent_60%)] blur-2xl" />
        <div className="absolute left-[30%] top-[5%] size-[26rem] rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.emerald.400/.18),transparent_60%)] blur-2xl" />

        {/* Right side glow (behind logo) */}
        <div className="absolute right-[5%] top-[20%] size-[28rem] rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.purple.400/.15),transparent_60%)] blur-2xl" />

        {/* Bottom center glow */}
        <div className="absolute bottom-[-10%] left-1/2 h-[32rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.cyan.400/.12),transparent_60%)] blur-3xl" />
      </div>
    </div>
  )
}
