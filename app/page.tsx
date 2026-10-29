import Image from "next/image";
import Sketch from "./Sketch";

const BLOG_URL =
  "https://commandline.microsoft.com/agentic-software-engineering-large-scale-code-migration-language-modernization-spec-driven-development/";
const GITHUB_URL = "https://github.com/swathi-mohan-123";
const LINKEDIN_URL = "https://linkedin.com/in/swathi-mohan-01333721a";
const EMAIL = "swathi15mohan@gmail.com";

function FaultSketch() {
  return (
    <Sketch
      label="a small detour"
      action="Introduce a fault"
      idle="The happy path. Everything goes as expected."
      active="A fault at work. Now there is a recovery path to check."
    >
      <svg viewBox="0 0 440 100" role="img" aria-label="Three steps: start, work and done. A fault at work forces a recovery detour before done.">
        <path className="route" d="M51 34 Q119 32 182 34" />
        <path className="route" d="M174 30 L182 34 L174 38" />
        <path className="route off-fade" d="M208 34 Q273 36 344 34" />
        <path className="route off-fade" d="M336 30 L344 34 L336 38" />
        <circle className="node" cx="39" cy="34" r="12" />
        <circle className="node fault-node" cx="195" cy="34" r="12" />
        <circle className="node" cx="357" cy="34" r="12" />
        <text x="39" y="14" textAnchor="middle">start</text>
        <text x="195" y="14" textAnchor="middle">work</text>
        <text x="357" y="14" textAnchor="middle">done</text>
        <g className="on-only">
          <path className="dashed" d="M201 46 C214 87 323 89 352 47" />
          <path className="dashed" d="M344 51 L353 46 L354 56" />
          <path d="M190 29 L200 39 M200 29 L190 39" fill="none" stroke="#a26d4e" strokeWidth="1.4" />
          <text x="279" y="95" textAnchor="middle" className="hand-text">recover &amp; retry</text>
        </g>
      </svg>
    </Sketch>
  );
}

function CoverageSketch() {
  const nodes: [number, number, boolean][] = [
    [30, 50, true], [95, 22, true], [95, 78, false],
    [170, 22, true], [170, 78, false], [245, 50, true],
    [320, 22, true], [320, 78, false], [400, 50, true],
  ];
  return (
    <Sketch
      label="every line ran. so, done?"
      action="Look closer"
      idle="Tests pass. Line coverage looks great."
      active="Six of nine behaviors reached. Three that no test ever touched."
    >
      <svg viewBox="0 0 440 104" role="img" aria-label="A small graph of system behaviors. Looking closer shows that three of nine behaviors were never reached by the tests.">
        <path className="route" d="M30 50 L95 22 M30 50 L95 78 M95 22 L170 22 M95 78 L170 78 M95 22 L170 78 M170 22 L245 50 M170 78 L245 50 M245 50 L320 22 M245 50 L320 78 M320 22 L400 50 M320 78 L400 50" />
        {nodes.map(([cx, cy, visited]) => (
          <circle key={`${cx}-${cy}`} className={`node ${visited ? "visited" : "unvisited"}`} cx={cx} cy={cy} r="9" />
        ))}
        <g className="on-only">
          <text x="95" y="102" textAnchor="middle" className="hand-text">?</text>
          <text x="170" y="102" textAnchor="middle" className="hand-text">?</text>
          <text x="320" y="102" textAnchor="middle" className="hand-text">never tried</text>
        </g>
      </svg>
    </Sketch>
  );
}

function RustSketch() {
  return (
    <Sketch
      label="a red pen for Rust"
      action="Check it"
      idle="Compiles. Looks harmless."
      active="A hidden panic. Propagate the error instead, then rebuild and retest."
    >
      <pre className="sketch-code" aria-label="Rust code: let config = load(path).unwrap(). Checking it replaces unwrap with a question mark, then the build and tests pass.">
        <code>
          let config = load(path)<span className="flag">.unwrap()</span>
          <span className="fix on-only">?</span>;
          <span className="hand ticks on-only">build ✓  tests ✓</span>
        </code>
      </pre>
    </Sketch>
  );
}

function OwnershipSketch() {
  return (
    <Sketch
      label="whose pointer is it, anyway?"
      action="Infer ownership"
      idle="One pointer, three possible meanings."
      active="Read from the callers: borrowed, never freed here, an array of n bytes."
    >
      <pre className="sketch-code" aria-label="C function fill taking char pointer buf and size n. Inferring ownership produces a Rust signature borrowing a mutable byte slice.">
        <code>
          <span className="line">
            {"void fill(char *buf, size_t n)   "}
            <span className="note off-fade">owned? borrowed? one or many?</span>
          </span>
          <span className="line on-only">
            {"fn fill(buf: &mut [u8])         "}
            <span className="comment">{"// borrowed, n of them"}</span>
          </span>
        </code>
      </pre>
    </Sketch>
  );
}

const research = [
  {
    title: "Testing what happens when systems fail",
    body: "Generating fault-injection tests from TLA+ specifications, with a focus on recovery behavior. Specifications are a good source of “rainy-day” tests: they tell you which failures can happen, and when. I drive real components into those faults and check that they recover.",
    tags: ["Fault tolerance", "Spec-driven testing"],
    sketch: <FaultSketch />,
  },
  {
    title: "Coverage beyond lines of code",
    body: "Using a trace-validated specification to identify untested behaviors and guide end-to-end test generation. I am interested in coverage measures that say something about the system, not just the code executed.",
    tags: ["Formal methods", "Test generation"],
    sketch: <CoverageSketch />,
  },
  {
    title: "Checking and repairing Rust code",
    body: "Large Rust codebases have dozens of engineering guidelines and no scalable way to enforce them. I built SymFix’s Rust checker: static analysis finds candidate violations, an agent separates real ones from false alarms and proposes fixes, and every fix must build and pass tests. Fixes from it have been merged into Microsoft production code.",
    tags: ["Program analysis", "Automated repair"],
    sketch: <RustSketch />,
  },
  {
    title: "From C pointers to Rust ownership",
    body: "Inferring ownership information across function boundaries to support C-to-Rust translation, using call-graph analysis and iterative validation.",
    tags: ["Code translation", "Ownership inference"],
    sketch: <OwnershipSketch />,
  },
];

export default function Home() {
  return (
    <div className="shell">
      <nav className="site-nav" aria-label="Main">
        <a className="name" href="#">Swathi Mohan</a>
        <div className="nav-links">
          <a href="#research">Research</a>
          <a href="#background">Background</a>
          <a href={GITHUB_URL}>GitHub</a>
        </div>
      </nav>

      <main>
        <section className="intro" aria-labelledby="name">
          <div>
            <div className="eyebrow">Software correctness &amp; reliability</div>
            <h1 id="name">Swathi Mohan</h1>
            <p className="role">Research Fellow, Microsoft Research</p>
            <p className="intro-copy">
              I work on testing and verification tools for software that is{" "}
              <span className="pencil-mark">
                difficult to get right
                <svg viewBox="0 0 190 9" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 5 Q62 0 111 4 T188 3 M8 8 Q87 3 177 7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </span>
              .
            </p>
            <p className="quiet-copy">
              My current focus is generating tests from formal specifications: which failures should we test, and how
              do we know <span className="highlight">what our tests have covered</span>? I also work on automated
              repair and C-to-Rust translation.
            </p>
            <div className="text-links">
              <a href="#research">Selected research ↓</a>
              <a href={`mailto:${EMAIL}`}>Email</a>
              <a href={LINKEDIN_URL}>LinkedIn ↗</a>
            </div>
          </div>
          <figure>
            <Image className="portrait" src="/photo.jpg" alt="Swathi Mohan" width={170} height={206} priority />
            <div className="margin-note hand" aria-hidden="true">
              <svg viewBox="0 0 26 24">
                <path d="M22 22 Q6 20 7 3 M2 9 L7 2 L12 8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              me, between bugs
            </div>
            <figcaption className="photo-caption">
              Research interests<br />Formal methods<br />Distributed systems<br />Software engineering
            </figcaption>
          </figure>
        </section>

        <section id="research" aria-labelledby="research-heading">
          <p className="context-note">
            Most of this work is part of Microsoft’s effort on specification-driven development, described in{" "}
            <a href={BLOG_URL}><em>Cheap code, precious trust</em></a> (October 2026).
          </p>
          <div className="section-heading">
            <h2 id="research-heading">
              Selected research
              <svg className="heading-star" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M7 1 L7.6 6.2 L13 7 L7.7 7.9 L7 13 L6.2 7.8 L1 7 L6.3 6.3 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            </h2>
            <span className="hand">each has a small sketch ↓</span>
          </div>
          {research.map((item, i) => (
            <article className="research-row" key={item.title}>
              <span className="research-number">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.sketch}
              </div>
              <span className="research-type">
                {item.tags[0]}<br />{item.tags[1]}
              </span>
            </article>
          ))}
        </section>

        <section className="bottom-grid" id="background" aria-label="Background">
          <div>
            <h2>Experience</h2>
            <div className="record"><strong>Microsoft Research</strong><span>Research Fellow · 2024–present</span></div>
            <div className="record"><strong>FischerJordan</strong><span>Machine learning intern · 2023–2024</span></div>
            <div className="record"><strong>SAP Labs</strong><span>Software engineering intern · 2023</span></div>
          </div>
          <div>
            <h2>Education &amp; teaching</h2>
            <div className="record">
              <strong>Manipal Institute of Technology</strong>
              <span>B.Tech, Computer Science &amp; Engineering · Minor in Data Science</span>
              <span>2020–2024 · CGPA 9.26</span>
            </div>
            <div className="record"><strong>Teaching assistant</strong><span>Data Structures &amp; Algorithms · Compiler Design</span></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Swathi Mohan · <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
        <span className="hand">Built by hand. Tested, mostly.</span>
      </footer>
    </div>
  );
}
