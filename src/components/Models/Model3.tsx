import { Phone, Mail, Link2, FileText } from "lucide-react";
import type { Model1Props } from "./Model1";

export type Model3Props = Model1Props;

export const Model3 = ({
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
}: Model3Props) => {
  const contactItems = [
    number,
    mail,
    ...socialMedias,
  ].filter(Boolean);

  return (
    <div
      id="cv-preview"
      className="bg-white text-neutral-800 rounded-lg shadow-xl overflow-hidden mx-auto w-full max-w-[210mm] min-h-[297mm] p-10 flex flex-col gap-8"
    >
      {/* En-tête */}
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          {firstName || lastName ? `${firstName} ${lastName}` : "Votre nom"}
        </h1>
        {jobName && (
          <p className="text-base text-amber-700 font-medium mt-1">{jobName}</p>
        )}
        <div className="w-14 h-0.5 bg-amber-600 mt-3" />
        {contactItems.length > 0 && (
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-neutral-500 mt-4">
            {number && (
              <span className="flex items-center gap-1.5">
                <Phone size={13} /> {number}
              </span>
            )}
            {mail && (
              <span className="flex items-center gap-1.5">
                <Mail size={13} /> {mail}
              </span>
            )}
            {socialMedias.map((sm) => (
              <span key={sm} className="flex items-center gap-1.5">
                <Link2 size={13} /> {sm}
              </span>
            ))}
          </div>
        )}
      </header>

      {about || experiences.length > 0 || formation.length > 0 || skills.length > 0 ? (
        <div className="flex flex-col gap-8">
          {about && (
            <section className="break-inside-avoid">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">
                Profil
              </h2>
              <p className="text-sm leading-relaxed text-neutral-700 whitespace-pre-line">
                {about}
              </p>
            </section>
          )}

          {experiences.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-4 break-inside-avoid">
                Expérience professionnelle
              </h2>
              <div className="flex flex-col gap-5">
                {sortedExperiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="border-l-2 border-neutral-200 pl-4 break-inside-avoid"
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

          {(formation.length > 0 || skills.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2 border-t border-neutral-200">
              {formation.length > 0 && (
                <section>
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3">
                    Formation
                  </h2>
                  <div className="flex flex-col gap-3">
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

              {skills.length > 0 && (
                <section>
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3">
                    Compétences
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <span
                        key={s.id}
                        className="text-xs px-2.5 py-1 rounded-full border border-neutral-300 text-neutral-600"
                      >
                        {s.skillTitle}
                      </span>
                    ))}
                  </div>
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