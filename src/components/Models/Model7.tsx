import { FileText } from "lucide-react";
import type { Model1Props } from "./Model1";

export type Model7Props = Model1Props;

// Petites aides pour la coloration syntaxique façon VS Code Dark+
const Kw = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#569cd6]">{children}</span>
);
const Key = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#9cdcfe]">{children}</span>
);
const Str = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#ce9178]">"{children}"</span>
);
const Punct = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#d4d4d4]">{children}</span>
);
const Comment = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#6a9955]">{children}</span>
);
const Num = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#b5cea8]">{children}</span>
);

export const Model7 = ({
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
}: Model7Props) => {
  const hasContent =
    about || experiences.length > 0 || formation.length > 0 || skills.length > 0;

  return (
    <div
      id="cv-preview"
      className="bg-[#1e1e1e] text-[#d4d4d4] font-mono rounded-lg shadow-xl overflow-hidden mx-auto w-full max-w-[210mm] min-h-[297mm] flex flex-col"
    >
      {/* Barre de titre façon éditeur de code */}
      <div className="bg-[#323233] px-4 py-3 flex items-center gap-2 shrink-0">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="text-xs text-[#858585] ml-2">
          {(firstName || "cv").toLowerCase()}.ts
        </span>
      </div>

      <div className="p-8 text-[13px] leading-relaxed flex-1">
        <p className="mb-4">
          <Comment>{`// ${firstName || "Prénom"} ${lastName || "Nom"}`}</Comment>
        </p>

        <p>
          <Kw>interface</Kw> <Punct>Profile {"{"}</Punct>
        </p>
        <p className="pl-4">
          <Key>name</Key>
          <Punct>: </Punct>
          <Str>{`${firstName} ${lastName}`.trim() || "Votre nom"}</Str>
          <Punct>;</Punct>
        </p>
        {jobName && (
          <p className="pl-4">
            <Key>role</Key>
            <Punct>: </Punct>
            <Str>{jobName}</Str>
            <Punct>;</Punct>
          </p>
        )}
        {(number || mail || socialMedias.length > 0) && (
          <>
            <p className="pl-4">
              <Key>contact</Key>
              <Punct>: {"{"}</Punct>
            </p>
            {number && (
              <p className="pl-8">
                <Key>phone</Key>
                <Punct>: </Punct>
                <Str>{number}</Str>
                <Punct>;</Punct>
              </p>
            )}
            {mail && (
              <p className="pl-8">
                <Key>email</Key>
                <Punct>: </Punct>
                <Str>{mail}</Str>
                <Punct>;</Punct>
              </p>
            )}
            {socialMedias.map((sm, i) => (
              <p key={sm} className="pl-8">
                <Key>link{i > 0 ? i + 1 : ""}</Key>
                <Punct>: </Punct>
                <Str>{sm}</Str>
                <Punct>;</Punct>
              </p>
            ))}
            <p className="pl-4">
              <Punct>{"}"};</Punct>
            </p>
          </>
        )}
        <p className="mb-6">
          <Punct>{"}"}</Punct>
        </p>

        {hasContent ? (
          <>
            {about && (
              <div className="mb-6 break-inside-avoid">
                <p>
                  <Comment>// À propos</Comment>
                </p>
                <p>
                  <Kw>const</Kw> <Key>about</Key> <Punct>=</Punct>{" "}
                  <Punct>{"`"}</Punct>
                </p>
                <p className="pl-4 text-[#ce9178] whitespace-pre-line">{about}</p>
                <p>
                  <Punct>{"`"};</Punct>
                </p>
              </div>
            )}

            {skills.length > 0 && (
              <div className="mb-6 break-inside-avoid">
                <p>
                  <Comment>// Compétences</Comment>
                </p>
                <p>
                  <Kw>const</Kw> <Key>skills</Key>
                  <Punct>: </Punct>
                  <Kw>string</Kw>
                  <Punct>[] = [</Punct>
                </p>
                <p className="pl-4">
                  {skills.map((s, i) => (
                    <span key={s.id}>
                      <Str>{s.skillTitle}</Str>
                      {i < skills.length - 1 && <Punct>, </Punct>}
                    </span>
                  ))}
                </p>
                <p>
                  <Punct>];</Punct>
                </p>
              </div>
            )}

            {experiences.length > 0 && (
              <div className="mb-6">
                <p>
                  <Comment>// Expérience professionnelle</Comment>
                </p>
                <p>
                  <Kw>const</Kw> <Key>experience</Key> <Punct>= [</Punct>
                </p>
                {sortedExperiences.map((exp) => (
                  <div key={exp.id} className="pl-4 break-inside-avoid">
                    <p>
                      <Punct>{"{"}</Punct>
                    </p>
                    <p className="pl-4">
                      <Key>role</Key>
                      <Punct>: </Punct>
                      <Str>{exp.jobTitle}</Str>
                      <Punct>,</Punct>
                    </p>
                    {exp.place && (
                      <p className="pl-4">
                        <Key>company</Key>
                        <Punct>: </Punct>
                        <Str>{exp.place}</Str>
                        <Punct>,</Punct>
                      </p>
                    )}
                    <p className="pl-4">
                      <Key>period</Key>
                      <Punct>: [</Punct>
                      <Num>{exp.startYear}</Num>
                      <Punct>, </Punct>
                      <Num>{exp.endYear <= 0 ? "A nos jours" : exp.endYear}</Num>
                      <Punct>],</Punct>
                    </p>
                    {exp.description && (
                      <p className="pl-4">
                        <Key>description</Key>
                        <Punct>: </Punct>
                        <span className="text-[#ce9178] whitespace-pre-line">
                          "{exp.description}"
                        </span>
                        <Punct>,</Punct>
                      </p>
                    )}
                    <p>
                      <Punct>{"},"}</Punct>
                    </p>
                  </div>
                ))}
                <p>
                  <Punct>];</Punct>
                </p>
              </div>
            )}

            {formation.length > 0 && (
              <div className="mb-6">
                <p>
                  <Comment>// Formation</Comment>
                </p>
                <p>
                  <Kw>const</Kw> <Key>education</Key> <Punct>= [</Punct>
                </p>
                {sortedFormation.map((f) => (
                  <div key={f.id} className="pl-4 break-inside-avoid">
                    <p>
                      <Punct>{"{"}</Punct>
                    </p>
                    <p className="pl-4">
                      <Key>degree</Key>
                      <Punct>: </Punct>
                      <Str>{f.degree}</Str>
                      <Punct>,</Punct>
                    </p>
                    <p className="pl-4">
                      <Key>institution</Key>
                      <Punct>: </Punct>
                      <Str>{f.institution}</Str>
                      <Punct>,</Punct>
                    </p>
                    <p className="pl-4">
                      <Key>period</Key>
                      <Punct>: [</Punct>
                      <Num>{f.startYear}</Num>
                      <Punct>, </Punct>
                      <Num>{f.endYear <= 0 ? "A nos jours" : f.endYear}</Num>
                      <Punct>],</Punct>
                    </p>
                    <p>
                      <Punct>{"},"}</Punct>
                    </p>
                  </div>
                ))}
                <p>
                  <Punct>];</Punct>
                </p>
              </div>
            )}

            <p className="mt-2">
              <Kw>export default</Kw>{" "}
              <Key>{(firstName || "developer").toLowerCase()}</Key>
              <Punct>;</Punct>
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-[#858585] gap-2 py-16">
            <FileText size={28} />
            <p className="text-xs">
              Renseignez vos informations pour voir votre CV prendre forme ici.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};