import { Phone, Mail, Link2, FileText } from "lucide-react";
import type { Experience, Formation, Skill } from "../../types/types";

export interface Model1Props {
  initials: string;
  firstName: string;
  lastName: string;
  jobName: string;
  number: string;
  mail: string;
  socialMedias: string[];
  skills: Skill[];
  formation: Formation[];
  about: string;
  experiences: Experience[];
  sortedExperiences: Experience[];
  sortedFormation: Formation[];
  photo: string;
}

export const Model1 = ({
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
}: Model1Props) => {
  return (
    <div
      id="cv-preview"
      className="bg-white text-[#262626] rounded-lg shadow-xl overflow-hidden mx-auto w-full max-w-[210mm] min-h-[297mm] grid grid-cols-1 sm:grid-cols-[260px_1fr]"
    >
      {/* Colonne latérale */}
      <aside className="bg-[#171717] text-[#fafafa] p-8 flex flex-col gap-8">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-24 h-24 rounded-full bg-[#1f2937] text-[#fafafa] flex items-center justify-center text-3xl font-serif overflow-hidden shrink-0">
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
            <h1 className="font-serif text-2xl leading-tight">
              {firstName || lastName ? `${firstName} ${lastName}` : "Votre nom"}
            </h1>
            {jobName && (
              <p className="text-sm text-[#d4d4d4] mt-1">{jobName}</p>
            )}
          </div>
        </div>

        {(number || mail || socialMedias.length > 0) && (
          <div className="flex flex-col gap-2 text-sm border-t border-[#404040] pt-6">
            {number && (
              <div className="flex items-center gap-2 text-[#e5e5e5]">
                <Phone size={14} className="shrink-0" />
                <span className="break-words">{number}</span>
              </div>
            )}
            {mail && (
              <div className="flex items-center gap-2 text-[#e5e5e5]">
                <Mail size={14} className="shrink-0" />
                <span className="break-words">{mail}</span>
              </div>
            )}
            {socialMedias.map((sm) => (
              <div key={sm} className="flex items-center gap-2 text-[#e5e5e5]">
                <Link2 size={14} className="shrink-0" />
                <span className="break-words">{sm}</span>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div className="flex flex-col gap-3 text-sm border-t border-[#404040] pt-6">
            <h2 className="font-serif text-base">Compétences</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span
                  key={s.id}
                  className="text-xs px-2.5 py-1 rounded-full bg-[#404040] text-[#f5f5f5]"
                >
                  {s.skillTitle}
                </span>
              ))}
            </div>
          </div>
        )}

        {formation.length > 0 && (
          <div className="flex flex-col gap-3 text-sm border-t border-[#404040] pt-6">
            <h2 className="font-serif text-base">Formation</h2>
            <div className="flex flex-col gap-3">
              {sortedFormation.map((f) => (
                <div key={f.id} className="break-inside-avoid">
                  <p className="font-medium text-[#f5f5f5]">{f.degree}</p>
                  <p className="text-[#a3a3a3] text-xs mt-0.5">
                    {f.institution}
                  </p>
                  <p className="text-[#737373] text-xs">
                    {f.startYear} - {f.endYear}
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
            <h2 className="font-serif text-lg text-[#171717] pb-2 mb-3 border-b border-[#e5e5e5]">
              À propos
            </h2>
            <p className="text-sm leading-relaxed text-[#404040] whitespace-pre-line">
              {about}
            </p>
          </section>
        )}

        {experiences.length > 0 && (
          <section>
            <h2 className="font-serif text-lg text-[#171717] pb-2 mb-4 border-b border-[#e5e5e5] break-inside-avoid">
              Expérience professionnelle
            </h2>
            <div className="flex flex-col gap-5">
              {sortedExperiences.map((exp) => (
                <div
                  key={exp.id}
                  className="flex flex-col gap-1 break-inside-avoid"
                >
                  <div className="flex justify-between items-baseline flex-wrap gap-x-3">
                    <p className="font-medium text-[#171717] text-sm">
                      {exp.jobTitle}
                      {exp.place && (
                        <span className="text-[#737373] font-normal">
                          {" "}
                          · {exp.place}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-[#737373] whitespace-nowrap">
                      {exp.startYear} - {exp.endYear}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-[#404040] leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {!about && experiences.length === 0 && formation.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-[#a3a3a3] gap-2 py-20">
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
