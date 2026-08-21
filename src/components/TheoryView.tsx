import type { Theory } from "@/lib/theory";

/** Muestra la teoría de un tema: tablas, reglas con ejemplo y avisos. */
export default function TheoryView({ theory }: { theory: Theory }) {
  return (
    <div className="space-y-8">
      <p className="text-sm text-slate-600 sm:text-base dark:text-slate-400">
        {theory.intro}
      </p>

      {theory.sections.map((section) => (
        <section key={section.title}>
          <h2 className="text-base font-semibold sm:text-lg">{section.title}</h2>

          <div className="mt-3 space-y-4">
            {section.blocks.map((block, index) => {
              if (block.kind === "text") {
                return (
                  <p
                    key={index}
                    className="text-sm text-slate-600 dark:text-slate-400"
                  >
                    {block.text}
                  </p>
                );
              }

              if (block.kind === "table") {
                return (
                  <div key={index} className="overflow-x-auto">
                    <table className="w-full min-w-md border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          {block.head.map((cell) => (
                            <th
                              key={cell}
                              className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                            >
                              {cell}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row) => (
                          <tr
                            key={row.join("|")}
                            className="border-b border-slate-100 last:border-0 dark:border-slate-800/60"
                          >
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className={`px-3 py-2 ${
                                  cellIndex === 0
                                    ? "font-medium"
                                    : "text-slate-600 dark:text-slate-400"
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }

              if (block.kind === "rules") {
                return (
                  <ul key={index} className="space-y-3">
                    {block.items.map((item) => (
                      <li
                        key={item.rule}
                        className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                      >
                        <p className="text-sm font-medium">{item.rule}</p>
                        <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
                          ✓ {item.ok}
                        </p>
                        {item.bad && (
                          <p className="text-sm text-rose-600 dark:text-rose-400">
                            ✗ {item.bad}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <div
                  key={index}
                  className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/40"
                >
                  <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                    {block.title}
                  </p>
                  <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">
                    {block.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
