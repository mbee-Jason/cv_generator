import { Phone, Mail, Link2, FileText } from "lucide-react";
import type { Model1Props } from "./Model1";

export type Model2Props = Model1Props;

export const Model2 = ({
  initials,
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
  photo,
}: Model2Props) => {
  return (
    <div
      id="cv-preview"
      className="bg-white text-[#374151] rounded-lg shadow-xl overflow-hidden mx-auto w-full max-w-[210mm] min-h-[297mm] flex flex-col"
    >
      {/* Bandeau d'en-tête */}
      <header className="bg-[#111827] text-white p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-2xl font-semibold overflow-hidden shrink-0">
            {photo ? (
              <img
                src={photo}
                alt={`${firstName} ${lastName}`.trim() || "Photo de profil"}
                className="w-full h-full object-cover"
              />
            ) : (
              initials
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold leading-tight">
              {firstName || lastName ? `${firstName} ${lastName}` : "Votre nom"}
            </h1>
            {jobName && (
              <p className="text-sm text-[#cbd5e1] mt-1 tracking-wide">
                {jobName}
              </p>
            )}
          </div>
        </div>

        {(number || mail || socialMedias.length > 0) && (
          <div className="flex flex-col gap-1.5 text-sm sm:text-right sm:items-end">
            {number && (
              <div className="flex items-center gap-2 text-[#e5e7eb]">
                <span className="break-words">{number}</span>
                <Phone size={13} className="shrink-0" />
              </div>
            )}
            {mail && (
              <div className="flex items-center gap-2 text-[#e5e7eb]">
                <span className="break-words">{mail}</span>
                <Mail size={13} className="shrink-0" />
              </div>
            )}
            {socialMedias.map((sm) => (
              <div key={sm} className="flex items-center gap-2 text-[#e5e7eb]">
                <span className="break-words">{sm}</span>
                <Link2 size={13} className="shrink-0" />
              </div>
            ))}
          </div>
        )}
      </header>
      <div className="h-1.5 bg-[#2563eb] shrink-0" />

      {/* Corps du CV */}
      {about ||
      experiences.length > 0 ||
      formation.length > 0 ||
      skills.length > 0 ? (
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
          {/* Colonne principale */}
          <div className="md:col-span-2 flex flex-col gap-8">
            {about && (
              <section className="break-inside-avoid">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563eb] pb-2 mb-3 border-b-2 border-[#e5e7eb]">
                  Profil
                </h2>
                <p className="text-sm leading-relaxed text-[#374151] whitespace-pre-line">
                  {about}
                </p>
              </section>
            )}

            {experiences.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563eb] pb-2 mb-5 border-b-2 border-[#e5e7eb] break-inside-avoid">
                  Expérience professionnelle
                </h2>
                <div className="flex flex-col gap-6">
                  {sortedExperiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="relative pl-5 border-l-2 border-[#e5e7eb] break-inside-avoid"
                    >
                      <span className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#2563eb]" />
                      <div className="flex justify-between items-baseline flex-wrap gap-x-3">
                        <p className="font-semibold text-[#111827] text-sm">
                          {exp.jobTitle}
                          {exp.place && (
                            <span className="text-[#6b7280] font-normal">
                              {" "}
                              · {exp.place}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-[#6b7280] whitespace-nowrap">
                          {exp.startYear} - {exp.endYear <= 0 ? "A nos jours" : exp.endYear}
                        </p>
                      </div>
                      {exp.description && (
                        <p className="text-sm text-[#374151] leading-relaxed mt-1 whitespace-pre-line">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Colonne latérale */}
          <div className="flex flex-col gap-8">
            {skills.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563eb] pb-2 mb-3 border-b-2 border-[#e5e7eb]">
                  Compétences
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span
                      key={s.id}
                      className="text-xs px-2.5 py-1 rounded border border-[#2563eb] text-[#2563eb] break-inside-avoid"
                    >
                      {s.skillTitle}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {formation.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563eb] pb-2 mb-3 border-b-2 border-[#e5e7eb]">
                  Formation
                </h2>
                <div className="flex flex-col gap-4">
                  {sortedFormation.map((f) => (
                    <div key={f.id} className="break-inside-avoid">
                      <p className="font-semibold text-[#111827] text-sm">
                        {f.degree}
                      </p>
                      <p className="text-[#6b7280] text-xs mt-0.5">
                        {f.institution}
                      </p>
                      <p className="text-[#9ca3af] text-xs">
                        {f.startYear} - {f.endYear <= 0 ? "A nos jours" : f.endYear}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-[#9ca3af] gap-2 py-20">
          <FileText size={32} />
          <p className="text-sm">
            Renseignez vos informations pour voir votre CV prendre forme ici.
          </p>
        </div>
      )}
    </div>
  );
};
