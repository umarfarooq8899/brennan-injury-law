export default function Stamp({ children, size = 132, className = '' }) {
  return (
    <div
      className={`stamp text-oxblood ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.082, lineHeight: 1.15, padding: size * 0.14 }}
    >
      {children}
    </div>
  );
}
