import { Phone, Mail, Link2, FileText } from "lucide-react";
import type { Model1Props } from "./Model1";

export type Model4Props = Model1Props;

export const Model4 = ({
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
}: Model4Props) => {
  return (
    <div
      id="cv-preview"
      className="bg-white text-neutral-800 rounded-lg shadow-xl overflow-hidden mx-auto w-full max-w-[210mm] min-h-[297mm] grid grid-cols-1 sm:grid-cols-[240px_1fr]"
    >
      {/* Colonne latérale pastel */}
      <aside className="bg-teal-50 text-teal-900 p-7 flex flex-col gap-7">
        <div>
          <h1 className="text-xl font-bold leading-tight">
            {firstName || lastName ? `${firstName} ${lastName}` : "Votre nom"}
          </h1>
          {jobName && (
            <span className="inline-block mt-2 text-xs font-medium text-teal-700 bg-teal-100 px-2.5 py-1 rounded-full">
              {jobName}
            </span>
          )}
        </div>

        {(number || mail || socialMedias.length > 0) && (
          <div className="flex flex-col gap-2 text-sm border-t border-teal-200 pt-5">
            {number && (
              <div className="flex items-center gap-2 text-teal-800">
                <Phone size={14} className="text-teal-600 shrink-0" />
                <span className="break-words">{number}</span>
              </div>
            )}
            {mail && (
              <div className="flex items-center gap-2 text-teal-800">
                <Mail size={14} className="text-teal-600 shrink-0" />
                <span className="break-words">{mail}</span>
              </div>
            )}
            {socialMedias.map((sm) => (
              <div key={sm} className="flex items-center gap-2 text-teal-800">
                <Link2 size={14} className="text-teal-600 shrink-0" />
                <span className="break-words">{sm}</span>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div className="flex flex-col gap-3 text-sm border-t border-teal-200 pt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Compétences
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span
                  key={s.id}
                  className="text-xs px-2.5 py-1 rounded-full bg-white text-teal-700 border border-teal-200"
                >
                  {s.skillTitle}
                </span>
              ))}
            </div>
          </div>
        )}

        {formation.length > 0 && (
          <div className="flex flex-col gap-3 text-sm border-t border-teal-200 pt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Formation
            </h2>
            <div className="flex flex-col gap-3">
              {sortedFormation.map((f) => (
                <div key={f.id} className="break-inside-avoid">
                  <p className="font-semibold text-teal-900">{f.degree}</p>
                  <p className="text-teal-600 text-xs mt-0.5">{f.institution}</p>
                  <p className="text-teal-500 text-xs">
                    {f.startYear} - {f.endYear <= 0 ? "A nos jours" : f.endYear}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Contenu principal */}
      <main className="p-8 flex flex-col gap-8">
        {about && (
          <section className="break-inside-avoid">
            <h2 className="text-lg font-bold text-neutral-900 border-l-4 border-teal-500 pl-3 mb-3">
              Profil
            </h2>
            <p className="text-sm leading-relaxed text-neutral-700 whitespace-pre-line">
              {about}
            </p>
          </section>
        )}

        {experiences.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-neutral-900 border-l-4 border-teal-500 pl-3 mb-4 break-inside-avoid">
              Expérience professionnelle
            </h2>
            <div className="flex flex-col gap-4">
              {sortedExperiences.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-neutral-50 rounded-lg p-4 break-inside-avoid"
                >
                  <div className="flex justify-between items-baseline flex-wrap gap-x-3">
                    <p className="font-semibold text-neutral-900 text-sm">
                      {exp.jobTitle}
                      {exp.place && (
                        <span className="text-neutral-500 font-normal">
                          {" "}
                          · {exp.place}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-neutral-500 whitespace-nowrap">
                      {exp.startYear} - {exp.endYear <= 0 ? "A nos jours" : exp.endYear}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-neutral-700 leading-relaxed mt-1.5 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {!about && experiences.length === 0 && formation.length === 0 && skills.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-neutral-400 gap-2 py-20">
            <FileText size={32} />
            <p className="text-sm">
              Renseignez vos informations pour voir votre CV prendre forme ici.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};