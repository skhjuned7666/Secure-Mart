"use client";

type SectionProps = {
  title?: string;
  label?: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** Title element size - default h2 with text-lg */
  titleClassName?: string;
};

export default function Section({
  title,
  label,
  headerRight,
  children,
  id,
  className = "",
  titleClassName = "text-lg font-bold text-gray-900",
}: SectionProps) {
  const hasHeader = title || label || headerRight;

  return (
    <section
      id={id}
      className={`bg-white border border-gray-200 rounded-xl p-5 ${className}`}
    >
      {hasHeader && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {title && <h2 className={titleClassName}>{title}</h2>}
            {label && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                {label}
              </span>
            )}
          </div>
          {headerRight && <div className="flex items-center gap-2">{headerRight}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
