import { Phone, Mail, Link2, FileText } from "lucide-react";
import type { Model1Props } from "./Model1";

export type Model5Props = Model1Props;

export const Model5 = ({
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
}: Model5Props) => {
  const hasContent =
    about || experiences.length > 0 || formation.length > 0 || skills.length > 0;

  return (
    <div
      id="cv-preview"
      className="bg-neutral-50 text-neutral-800 rounded-lg shadow-xl overflow-hidden mx-auto w-full max-w-[210mm] min-h-[297mm] p-6 flex flex-col gap-5"
    >
      {/* Carte d'en-tête */}
      <header className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 break-inside-avoid">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 leading-tight">
            {firstName || lastName ? `${firstName} ${lastName}` : "Votre nom"}
          </h1>
          {jobName && (
            <p className="text-sm text-violet-600 font-semibold uppercase tracking-wide mt-1">
              {jobName}
            </p>
          )}
        </div>

        {(number || mail || socialMedias.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {number && (
              <span className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full bg-violet-50 text-violet-700">
                <Phone size={12} /> {number}
              </span>
            )}
            {mail && (
              <span className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full bg-violet-50 text-violet-700">
                <Mail size={12} /> {mail}
              </span>
            )}
            {socialMedias.map((sm) => (
              <span
                key={sm}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full bg-violet-50 text-violet-700"
              >
                <Link2 size={12} /> {sm}
              </span>
            ))}
          </div>
        )}
      </header>

      {hasContent ? (
        <>
          {/* Rangée Profil + Compétences */}
          {(about || skills.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {about && (
                <section className="md:col-span-2 bg-white rounded-xl shadow-sm p-5 break-inside-avoid">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-2">
                    Profil
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-700 whitespace-pre-line">
                    {about}
                  </p>
                </section>
              )}

              {skills.length > 0 && (
                <section className="bg-white rounded-xl shadow-sm p-5 break-inside-avoid">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-3">
                    Compétences
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <span
                        key={s.id}
                        className="text-xs px-2.5 py-1 rounded-full bg-violet-50 text-violet-700"
                      >
                        {s.skillTitle}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* Carte Expérience */}
          {experiences.length > 0 && (
            <section className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-4 break-inside-avoid">
                Expérience professionnelle
              </h2>
              <div className="flex flex-col gap-4">
                {sortedExperiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="border-l-4 border-violet-200 pl-4 break-inside-avoid"
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
                      <p className="text-sm text-neutral-700 leading-relaxed mt-1 whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Carte Formation */}
          {formation.length > 0 && (
            <section className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-3 break-inside-avoid">
                Formation
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sortedFormation.map((f) => (
                  <div key={f.id} className="break-inside-avoid">
                    <p className="font-semibold text-neutral-900 text-sm">
                      {f.degree}
                    </p>
                    <p className="text-neutral-500 text-xs mt-0.5">
                      {f.institution}
                    </p>
                    <p className="text-neutral-400 text-xs">
                      {f.startYear} - {f.endYear <= 0 ? "A nos jours" : f.endYear}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-neutral-400 gap-2 py-20 bg-white rounded-xl shadow-sm">
          <FileText size={32} />
          <p className="text-sm">
            Renseignez vos informations pour voir votre CV prendre forme ici.
          </p>
        </div>
      )}
    </div>
  );
};
