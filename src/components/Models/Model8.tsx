import type { Model1Props } from "./Model1";
import { FileText } from "lucide-react";

export type Model8Props = Model1Props;

export const Model8 = ({
  firstName,
  lastName,
  jobName,
  number,
  mail,
  socialMedias,
  skills,
  formation,
  about,
  experiences,
  sortedExperiences,
  sortedFormation,
}: Model8Props) => {
  const contactLine = [number, mail, ...socialMedias].filter(Boolean).join("  —  ");
  const hasContent =
    about || experiences.length > 0 || formation.length > 0 || skills.length > 0;

  return (
    <div
      id="cv-preview"
      className="bg-[#f7f4ee] text-neutral-900 font-serif rounded-lg shadow-xl overflow-hidden mx-auto w-full max-w-[210mm] min-h-[297mm] p-10 flex flex-col gap-8"
    >
      {/* Manchette */}
      <header className="text-center pb-5 border-b-4 border-double border-neutral-900 break-inside-avoid">
        <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-2">
          Édition professionnelle
        </p>
        <h1 className="text-4xl font-black tracking-tight uppercase">
          {firstName || lastName ? `${firstName} ${lastName}` : "Votre nom"}
        </h1>
        {jobName && (
          <p className="italic text-sm text-neutral-600 mt-2">{jobName}</p>
        )}
        {contactLine && (
          <p className="text-[11px] text-neutral-500 mt-3 tracking-wide">
            {contactLine}
          </p>
        )}
      </header>

      {hasContent ? (
        <div className="flex flex-col gap-8">
          {about && (
            <section className="break-inside-avoid">
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-center mb-3">
                — Profil —
              </h2>
              <p className="text-sm leading-relaxed text-justify columns-1 sm:columns-2 gap-8 first-letter:text-4xl first-letter:font-black first-letter:mr-1 first-letter:float-left whitespace-pre-line">
                {about}
              </p>
            </section>
          )}

          {experiences.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-center mb-4 border-t border-b border-neutral-900 py-1.5 break-inside-avoid">
                Expérience professionnelle
              </h2>
              <div className="flex flex-col gap-5">
                {sortedExperiences.map((exp) => (
                  <div key={exp.id} className="break-inside-avoid">
                    <div className="flex justify-between items-baseline flex-wrap gap-x-3">
                      <p className="font-bold uppercase text-sm tracking-wide">
                        {exp.jobTitle}
                        {exp.place && (
                          <span className="font-normal normal-case text-neutral-600">
                            {" "}
                            · {exp.place}
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] italic text-neutral-500 whitespace-nowrap">
                        {exp.startYear} – {exp.endYear}
                      </p>
                    </div>
                    {exp.description && (
                      <p className="text-sm leading-relaxed text-neutral-700 mt-1 whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {(formation.length > 0 || skills.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {formation.length > 0 && (
                <section className="border border-neutral-900 p-4 break-inside-avoid">
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-center mb-3 border-b border-neutral-900 pb-2">
                    Formation
                  </h2>
                  <div className="flex flex-col gap-3">
                    {sortedFormation.map((f) => (
                      <div key={f.id} className="text-center">
                        <p className="font-bold text-sm">{f.degree}</p>
                        <p className="text-neutral-600 text-xs mt-0.5">
                          {f.institution}
                        </p>
                        <p className="text-neutral-500 text-[11px] italic">
                          {f.startYear} – {f.endYear}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {skills.length > 0 && (
                <section className="border border-neutral-900 p-4 break-inside-avoid">
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-center mb-3 border-b border-neutral-900 pb-2">
                    Compétences
                  </h2>
                  <p className="text-sm text-neutral-700 text-center leading-relaxed">
                    {skills.map((s) => s.skillTitle).join("  ·  ")}
                  </p>
                </section>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-neutral-400 gap-2 py-20">
          <FileText size={32} />
          <p className="text-sm">
            Renseignez vos informations pour voir votre CV prendre forme ici.
          </p>
        </div>
      )}
    </div>
  );
};