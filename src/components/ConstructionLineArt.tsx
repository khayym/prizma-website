import * as React from "react";

/** Ground line of the sketch in viewBox units. */
const GROUND = 520;

/** Lattice mast: two chords from `bottom` up to `top`, zig-zag braced per bay. */
const mastPath = (x1: number, x2: number, bottom: number, top: number, bay: number) => {
  let d = `M${x1} ${bottom}V${top}M${x2} ${bottom}V${top}`;
  for (let y = bottom; y - bay >= top; y -= bay) {
    d += `M${x1} ${y}L${x2} ${y - bay}M${x1} ${y - bay}H${x2}`;
  }
  return d;
};

/** Lattice boom (jib or counter-jib) between `from` and `to`, braced as a Warren truss. */
const boomPath = (from: number, to: number, yTop: number, yBottom: number, bay: number) => {
  const dir = Math.sign(to - from);
  let d = `M${from} ${yTop}H${to}M${from} ${yBottom}H${to}M${to} ${yTop}V${yBottom}`;
  let up = true;
  for (let x = from; dir > 0 ? x < to : x > to; x += dir * bay, up = !up) {
    const next = dir > 0 ? Math.min(x + bay, to) : Math.max(x - bay, to);
    d += `M${x} ${up ? yBottom : yTop}L${next} ${up ? yTop : yBottom}`;
  }
  return d;
};

interface TowerCraneProps {
  /** Mast centre. */
  x: number;
  /** Height of the slewing platform (jib level). */
  top: number;
  /** Tip of the working jib. */
  jibTo: number;
  /** End of the counter-jib. */
  counterTo: number;
  /** Trolley position along the jib. */
  trolleyAt: number;
  /** Height of the hook block. */
  hookAt: number;
}

/** Flat-top tower crane with operator cab, counterweights and a steel beam on the hook. */
const TowerCrane: React.FC<TowerCraneProps> = ({ x, top, jibTo, counterTo, trolleyAt, hookAt }) => {
  const x1 = x - 13;
  const x2 = x + 13;
  const dir = Math.sign(jibTo - x);
  const apex = top - 62;
  const cabX = dir > 0 ? x2 : x1;
  const cw = counterTo - Math.sign(counterTo - x) * 34;
  const t = trolleyAt;
  return (
    <g>
      {/* Foundation and mast */}
      <path d={`M${x1 - 16} ${GROUND}v-8h58v8`} />
      <path d={mastPath(x1, x2, GROUND - 8, top + 14, 30)} opacity="0.85" />
      {/* Slewing platform, cab and tower head */}
      <path d={`M${x1 - 4} ${top}h34v14h-34z`} />
      <path d={`M${cabX} ${top + 14}h${18 * dir}v18h${-18 * dir}zM${cabX + 5 * dir} ${top + 19}h${8 * dir}v6h${-8 * dir}z`} />
      <path d={`M${x1} ${top}L${x} ${apex}L${x2} ${top}M${x - 6} ${apex + 18}h12`} />
      {/* Working jib and counter-jib */}
      <path d={boomPath(x, jibTo, top - 16, top, 26)} />
      <path d={boomPath(x, counterTo, top - 8, top, 22)} opacity="0.85" />
      {/* Counterweight blocks */}
      <path d={`M${cw} ${top}v34h${Math.sign(counterTo - x) * 30}v-34M${cw} ${top + 11}h${Math.sign(counterTo - x) * 30}M${cw} ${top + 22}h${Math.sign(counterTo - x) * 30}`} />
      {/* Pendant ties from the tower head */}
      <path
        d={`M${x} ${apex}L${x + (jibTo - x) * 0.55} ${top - 16}M${x} ${apex}L${jibTo} ${top - 16}M${x} ${apex}L${counterTo} ${top - 8}`}
        opacity="0.6"
      />
      {/* Trolley, hoist ropes, hook block and hook */}
      <path d={`M${t - 10} ${top}h20v7h-20z`} />
      <path d={`M${t - 4} ${top + 7}V${hookAt}M${t + 4} ${top + 7}V${hookAt}`} opacity="0.75" />
      <path d={`M${t - 8} ${hookAt}h16v12h-16zM${t} ${hookAt + 12}v6a5 5 0 1 1 -5 5`} />
      {/* Slings and a steel I-beam being lifted */}
      <path d={`M${t} ${hookAt + 22}L${t - 44} ${hookAt + 42}M${t} ${hookAt + 22}L${t + 44} ${hookAt + 42}`} opacity="0.75" />
      <path d={`M${t - 60} ${hookAt + 42}h120v14h-120zM${t - 60} ${hookAt + 49}h120`} />
    </g>
  );
};

/** Floors of the building under construction, bottom-up. */
const floors = [476, 432, 388, 344, 300];
const columns = [150, 222, 294, 366, 438];

/**
 * Blueprint-style construction site drawn behind the hero: two tower cranes,
 * a building under construction with scaffolding, a tower block and a
 * concrete mixer. Purely decorative; color comes from `currentColor`.
 */
const ConstructionLineArt: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 1440 560"
    preserveAspectRatio="xMidYMax slice"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    {/* Ground */}
    <path d={`M0 ${GROUND}H1440`} />
    <path d={`M0 ${GROUND + 14}H1440`} strokeDasharray="2 10" opacity="0.6" />

    {/* Building under construction: finished lower floors, open frame above */}
    <path d={floors.map((y) => `M${columns[0]} ${y}H${columns[columns.length - 1]}`).join("")} />
    <path d={columns.map((cx) => `M${cx} ${GROUND}V${floors[floors.length - 1]}`).join("")} />
    <path
      d={floors
        .slice(0, 2)
        .flatMap((y) => columns.slice(0, -1).map((cx) => `M${cx + 16} ${y - 32}h40v20h-40z`))
        .join("")}
      opacity="0.7"
    />
    <path d={columns.map((cx) => `M${cx} ${floors[floors.length - 1]}V262`).join("")} strokeDasharray="4 6" />
    <path
      d={`M${columns[0]} ${floors[2]}L${columns[1]} ${floors[3]}M${columns[1]} ${floors[2]}L${columns[0]} ${floors[3]}M${columns[3]} ${floors[3]}L${columns[4]} ${floors[4]}M${columns[4]} ${floors[3]}L${columns[3]} ${floors[4]}`}
      opacity="0.6"
    />
    {/* Scaffolding on the left face */}
    <path d={`M112 ${GROUND}V286M128 ${GROUND}V286`} />
    <path
      d={Array.from({ length: 10 }, (_, i) => GROUND - i * 24)
        .map((y) => `M104 ${y}H136M112 ${y}L128 ${y - 24}`)
        .join("")}
      opacity="0.7"
    />

    {/* Main tower crane lifting a beam onto the building */}
    <TowerCrane x={640} top={112} jibTo={96} counterTo={792} trolleyAt={294} hookAt={200} />

    {/* Concrete mixer truck */}
    <path d="M708 506h150v-34h-38l-8-30h-60l-44 24z" opacity="0.9" />
    <path d="M728 468c14-22 58-26 76-6M740 458l10 10M760 450l10 14M782 448l8 16" opacity="0.7" />
    <path d="M820 472h26v-22h-26zM826 456h14" />
    <circle cx="740" cy="510" r="11" />
    <circle cx="828" cy="510" r="11" />

    {/* Houses */}
    <path d="M900 520V458L950 418L1000 458V520M932 520V484H968V520" opacity="0.8" />

    {/* Tower block */}
    <path d="M1050 520V320H1210V520" />
    <path
      d={[360, 400, 440, 480]
        .flatMap((y) => [1070, 1110, 1150].map((wx) => `M${wx} ${y}h24v18h-24z`))
        .join("")}
      opacity="0.6"
    />
    <path d="M1050 340H1210" opacity="0.6" />

    {/* Second tower crane on the right */}
    <TowerCrane x={1330} top={262} jibTo={1000} counterTo={1430} trolleyAt={1110} hookAt={300} />

    {/* Survey mark */}
    <circle cx="1392" cy="96" r="24" opacity="0.5" />
    <path d="M1392 66v60M1362 96h60" opacity="0.5" />
  </svg>
);

export default ConstructionLineArt;
