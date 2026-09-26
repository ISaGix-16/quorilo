function Logo({ width = "48px", className = "" }) {
  return (
    <img
      src="/Quorilo-Logo.png"
      alt="Quorilo"
      style={{ width }}
      className={`h-auto object-contain ${className}`}
    />
  );
}

export default Logo;
