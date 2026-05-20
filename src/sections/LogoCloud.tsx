import * as React from "react";

const partners = [
  "Acme Build",
  "Northpoint",
  "Stelvio",
  "Mercatur",
  "RostGroup",
  "Belmond",
];

const LogoCloud: React.FC = () => (
  <section className="border-y border-ink-100 bg-white py-10">
    <div className="container">
      <div className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {partners.map((name) => (
          <div
            key={name}
            className="text-center text-sm font-semibold uppercase tracking-wider text-ink-400"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LogoCloud;
