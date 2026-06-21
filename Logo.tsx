export function Logo({ size = 32 }: { size?: number }) {
  return (
    <img
      src="/Anchor_AI.png"
      alt="Anchor AI"
      style={{ height: size, width: 'auto' }}
      className="object-contain"
    />
  );
}

export function LogoWithText({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/Anchor_AI.png"
        alt="Anchor AI"
        style={{ height: size, width: 'auto' }}
        className="object-contain"
      />
      <span className="text-xl font-bold text-slate-900">Anchor AI</span>
    </div>
  );
}
