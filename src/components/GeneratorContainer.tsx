import { useEffect, useState } from "react";
import type { Experience, Formation, Skill } from "../types/types";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Download,
  User,
  FileText,
  Contact as ContactIcon,
  GraduationCap,
  Briefcase,
  Sparkles,
  Eye,
  Pencil,
  Camera,
  LayoutTemplate,
} from "lucide-react";
import { Themes } from "./Themes/Themes";
import { Model1 } from "./Models/Model1";
import { Model2 } from "./Models/Model2";
import { Model3 } from "./Models/Model3";
import { Model4 } from "./Models/Model4";
import { Model5 } from "./Models/Model5";
import { Model6 } from "./Models/Model6";
import { Model7 } from "./Models/Model7";
import { Model8 } from "./Models/Model8";
import html2pdf from "html2pdf.js";

type SectionKey =
  | "identification"
  | "about"
  | "contact"
  | "formation"
  | "experience"
  | "skills";

const SECTIONS: { key: SectionKey; label: string; icon: React.ReactNode }[] = [
  { key: "identification", label: "Identité", icon: <User size={16} /> },
  { key: "about", label: "À propos", icon: <FileText size={16} /> },
  { key: "contact", label: "Contact", icon: <ContactIcon size={16} /> },
  { key: "formation", label: "Formation", icon: <GraduationCap size={16} /> },
  { key: "experience", label: "Expérience", icon: <Briefcase size={16} /> },
  { key: "skills", label: "Compétences", icon: <Sparkles size={16} /> },
];

const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1950;
const MAX_YEAR = CURRENT_YEAR + 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Génère un id toujours unique, quel que soit l'ordre d'insertion/suppression
// de la liste (contrairement à "dernier élément + 1", qui casse dès qu'on
// insère en tête de liste ou qu'on supprime un élément).
const getNextId = (items: { id: number }[]) =>
  items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;


// Registre des modèles de CV disponibles.
// Pour ajouter un modèle : crée son composant dans ./Models/ (mêmes props
// que Model1), importe-le en haut du fichier, puis ajoute une ligne ici.
const CV_MODELS = [
  { key: "model1", label: "Classique", component: Model1 },
  { key: "model2", label: "Moderne", component: Model2 },
  { key: "model3", label: "Épuré", component: Model3 },
  { key: "model4", label: "Duo pastel", component: Model4 },
  { key: "model5", label: "Cartes", component: Model5 },
  { key: "model6", label: "Portrait", component: Model6 },
  { key: "model7", label: "Développeur", component: Model7 },
  { key: "model8", label: "Journal", component: Model8 },
  // Ajoute ici un futur modèle : { key: "model#", label: "...", component: Model# },
] as const;

type ModelKey = (typeof CV_MODELS)[number]["key"];


export const GeneratorContainer = () => {
  // Identification _________________________________________________________________________
  const saveLastName = localStorage.getItem("CVG_lastName");
  const saveFirstName = localStorage.getItem("CVG_firstName");
  const saveJobName = localStorage.getItem("CVG_jobName");
  const [lastName, setLastName] = useState(saveLastName || "");
  const [firstName, setFirstName] = useState(saveFirstName || "");
  const [jobName, setJobName] = useState(saveJobName || "");

  useEffect(() => {
    localStorage.setItem("CVG_lastName", lastName);
    localStorage.setItem("CVG_firstName", firstName);
    localStorage.setItem("CVG_jobName", jobName);
  }, [lastName, firstName, jobName]);

  const savePhoto = localStorage.getItem("CVG_photo");
  const [photo, setPhoto] = useState<string>(savePhoto || "");

  useEffect(() => {
    if (photo) {
      localStorage.setItem("CVG_photo", photo);
    } else {
      localStorage.removeItem("CVG_photo");
    }
  }, [photo]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Merci de choisir un fichier image");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  // À propos _________________________________________________________________________
  const saveAbout = localStorage.getItem("CVG_about");
  const [about, setAbout] = useState(saveAbout || "");

  useEffect(() => {
    localStorage.setItem("CVG_about", about);
  }, [about]);

  // Contact _________________________________________________________________________
  const saveNumber = localStorage.getItem("CVG_number");
  const saveMail = localStorage.getItem("CVG_mail");
  const [number, setNumber] = useState(saveNumber || "");
  const [mail, setMail] = useState(saveMail || "");
  const mailError = mail.trim().length > 0 && !EMAIL_REGEX.test(mail.trim());

  useEffect(() => {
    localStorage.setItem("CVG_number", number);
    localStorage.setItem("CVG_mail", mail);
  }, [number, mail]);

  const saveMedia = localStorage.getItem("CVG_socialMedias");
  const initialSocialMedias = saveMedia ? JSON.parse(saveMedia) : [];
  const [socialMedias, setSocialMedias] =
    useState<string[]>(initialSocialMedias);
  const [inputSocialMedia, setInputSocialMedia] = useState("");

  useEffect(() => {
    localStorage.setItem("CVG_socialMedias", JSON.stringify(socialMedias));
  }, [socialMedias]);

  const handleAddMedia = () => {
    const newMedia = inputSocialMedia;
    if (inputSocialMedia.trim()) {
      setSocialMedias([newMedia, ...socialMedias]);
      setInputSocialMedia("");
    } else {
      alert("Le champ de saisie du réseau social est vide");
    }
  };

  const deleteMedia = (media: string) => {
    setSocialMedias(socialMedias.filter((sm) => sm !== media));
  };

  // Formation _________________________________________________________________________
  const saveFormation = localStorage.getItem("CVG_formations");
  const initialSaveFormation = saveFormation ? JSON.parse(saveFormation) : [];
  const [formation, setFormation] =
    useState<Formation[]>(initialSaveFormation);

  useEffect(() => {
    localStorage.setItem("CVG_formations", JSON.stringify(formation));
  }, [formation]);

  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [startYear, setStartYear] = useState<number>(0);
  const [endYear, setEndYear] = useState<number>(0);

  const handleAddFormation = () => {
    if (degree.trim() || institution.trim()) {
      const newFormation: Formation = {
        id: getNextId(formation),
        degree,
        institution,
        startYear,
        endYear,
      };
      setFormation([newFormation, ...formation]);
      setDegree("");
      setInstitution("");
      setStartYear(0);
      setEndYear(0);
    } else {
      alert("Le champ de saisie de formation est vide");
    }
  };

  const deleteFormation = (id: number) => {
    setFormation(formation.filter((f) => f.id !== id));
  };

  // Compétences _________________________________________________________________________
  const saveSkill = localStorage.getItem("CVG_skills");
  const initialSaveSkill = saveSkill ? JSON.parse(saveSkill) : [];
  const [skills, setSkills] = useState<Skill[]>(initialSaveSkill);
  const [skill, setSkill] = useState("");

  useEffect(() => {
    localStorage.setItem("CVG_skills", JSON.stringify(skills));
  }, [skills]);

  const handleAddSkill = () => {
    if (skill.trim()) {
      const newSkill: Skill = {
        id: getNextId(skills),
        skillTitle: skill,
      };
      setSkills([...skills, newSkill]);
      setSkill("");
    } else {
      alert("Le champ de saisie de compétences est vide");
    }
  };

  const deleteSkill = (id: number) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  // Expérience _________________________________________________________________________
  const saveExperience = localStorage.getItem("CVG_experiences");
  const initialSaveExperience = saveExperience
    ? JSON.parse(saveExperience)
    : [];
  const [experiences, setExperiences] = useState<Experience[]>(
    initialSaveExperience,
  );

  useEffect(() => {
    localStorage.setItem("CVG_experiences", JSON.stringify(experiences));
  }, [experiences]);

  const [place, setPlace] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startYearExp, setStartYearExp] = useState<number>(0);
  const [endYearExp, setEndYearExp] = useState<number>(0);

  const handleAddExperience = () => {
    if (place.trim() || jobTitle.trim() || description.trim()) {
      const newExperience: Experience = {
        id: getNextId(experiences),
        place,
        jobTitle,
        description,
        startYear: startYearExp,
        endYear: endYearExp,
      };
      setExperiences([newExperience, ...experiences]);
      setPlace("");
      setJobTitle("");
      setDescription("");
      setStartYearExp(0);
      setEndYearExp(0);
    } else {
      alert("Le champ de saisie d'expérience est vide");
    }
  };

  const deleteExperiences = (id: number) => {
    setExperiences(experiences.filter((e) => e.id !== id));
  };

  // Tri par année (la plus récente d'abord), utilisé partout à l'affichage
  const sortedFormation = [...formation].sort(
    (a, b) => (b.endYear || 0) - (a.endYear || 0),
  );
  const sortedExperiences = [...experiences].sort(
    (a, b) => (b.endYear || 0) - (a.endYear || 0),
  );

  // UI state _________________________________________________________________________
  const [activateForm, setActivateForm] = useState(true);
  const [activeSection, setActiveSection] =
    useState<SectionKey>("identification");
  const [mobileView, setMobileView] = useState<"form" | "preview">("form");

  const saveModel = localStorage.getItem("CVG_selectedModel");
  const [selectedModel, setSelectedModel] = useState<ModelKey>(
    (saveModel as ModelKey) || CV_MODELS[0].key,
  );

  useEffect(() => {
    localStorage.setItem("CVG_selectedModel", selectedModel);
  }, [selectedModel]);

  const ActiveModel =
    CV_MODELS.find((m) => m.key === selectedModel)?.component ??
    CV_MODELS[0].component;

  // Téléchargement du PDF _________________________________________________________________________
  const downloadPDF = async () => {
    const element = document.getElementById("cv-preview");
    if (!element) return;

    // Clone l'élément pour ne pas dépendre de sa mise en page à l'écran
    // (hauteur contrainte, overflow, position sticky des parents, etc.)
    const cloneElement = element.cloneNode(true) as HTMLElement;
    cloneElement.style.height = "auto";
    cloneElement.style.minHeight = "0";
    cloneElement.style.overflow = "visible";
    cloneElement.style.maxHeight = "none";
    cloneElement.style.boxShadow = "none";

    // Récupère le texte de toutes les feuilles de style <link> de la page et
    // l'injecte tel quel dans un <style> inline propre au clone. En
    // production, le CSS de Tailwind est chargé via un <link> externe ; pour
    // le lire, html2canvas doit accéder à ses cssRules en JS, ce qui peut
    // échouer silencieusement selon comment le fichier est servi (d'où un
    // rendu sans aucun style). Un <style> inline, lui, est toujours lisible.
    const styleTag = document.createElement("style");
    try {
      const links = Array.from(
        document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'),
      );
      const cssTexts = await Promise.all(
        links.map((link) =>
          fetch(link.href)
            .then((res) => res.text())
            .catch(() => ""),
        ),
      );
      styleTag.textContent = cssTexts.join("\n");
    } catch (err) {
      console.error("Impossible de récupérer les feuilles de style :", err);
    }

    // Conteneur temporaire, hors écran, en pleine largeur A4
    const tempContainer = document.createElement("div");
    tempContainer.appendChild(styleTag);
    tempContainer.appendChild(cloneElement);
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "0";
    tempContainer.style.width = "210mm";
    tempContainer.style.backgroundColor = "#ffffff";
    document.body.appendChild(tempContainer);

    const cleanup = () => {
      if (tempContainer.parentNode) {
        document.body.removeChild(tempContainer);
      }
    };

    const options = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${firstName || "mon"}-${lastName || "cv"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        scrollY: 0,
        windowHeight: cloneElement.scrollHeight,
        useCORS: true,
        logging: true,
        // Empêche html2canvas de remonter jusqu'à <body> pour déterminer
        // le fond (qui porte le thème DaisyUI en oklch).
        backgroundColor: "#ffffff",
      },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      // Évite de couper une expérience ou une formation entre deux pages,
      // sans pousser des blocs entiers sur la page suivante par précaution.
      pagebreak: { mode: ["css"] },
    };

    try {
      await html2pdf().from(cloneElement).set(options).save();
      cleanup();
    } catch (err) {
      console.error("Erreur lors de l'export PDF :", err);
      cleanup();
    }
  };

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "CV";

  return (
    <div className="min-h-screen bg-base-200">
      {/* Barre supérieure */}
      <div className="navbar bg-base-100 border-b border-base-300 px-4 md:px-8 sticky top-0 z-30">
        <div className="flex-1">
          <span className="font-semibold text-lg">
            Générateur de <span className="text-primary">CV</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-sm md:btn-md gap-1.5"
            >
              <LayoutTemplate size={16} />
              <span className="hidden sm:inline">
                {CV_MODELS.find((m) => m.key === selectedModel)?.label}
              </span>
            </div>
            <ul className="dropdown-content menu bg-base-100 rounded-box z-40 w-48 p-2 shadow-sm border border-base-300">
              {CV_MODELS.map((m) => (
                <li key={m.key}>
                  <button
                    type="button"
                    onClick={() => setSelectedModel(m.key)}
                    className={selectedModel === m.key ? "active" : ""}
                  >
                    {m.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <Themes />
          <button
            type="button"
            onClick={downloadPDF}
            className="btn btn-primary btn-sm md:btn-md"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Télécharger en PDF</span>
          </button>
        </div>
      </div>

      {/* Bascule mobile formulaire / aperçu */}
      <div className="lg:hidden sticky top-[65px] z-20 bg-base-200 px-4 pt-4">
        <div className="tabs tabs-boxed bg-base-100 w-full">
          <button
            type="button"
            className={`tab flex-1 gap-2 ${mobileView === "form" ? "tab-active" : ""}`}
            onClick={() => setMobileView("form")}
          >
            <Pencil size={14} /> Éditer
          </button>
          <button
            type="button"
            className={`tab flex-1 gap-2 ${mobileView === "preview" ? "tab-active" : ""}`}
            onClick={() => setMobileView("preview")}
          >
            <Eye size={14} /> Aperçu
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 items-start">
        {/* ------------------------ Formulaire ------------------------ */}
        <div
          className={`${mobileView === "form" ? "block" : "hidden"} lg:block lg:sticky lg:top-[89px]`}
        >
          <div className="card bg-base-100 shadow-sm border border-base-300">
            <div
              className="flex justify-between items-center px-5 py-4 cursor-pointer border-b border-base-300"
              onClick={() => setActivateForm(!activateForm)}
            >
              <span className="font-semibold">Renseigner mes informations</span>
              {activateForm ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            {activateForm && (
              <div className="p-5 flex flex-col gap-5">
                {/* Onglets de sections */}
                <div className="flex flex-wrap gap-1.5">
                  {SECTIONS.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setActiveSection(s.key)}
                      className={`btn btn-sm gap-1.5 ${
                        activeSection === s.key ? "btn-primary" : "btn-ghost"
                      }`}
                    >
                      {s.icon}
                      {s.label}
                    </button>
                  ))}
                </div>

                <form
                  className="flex flex-col gap-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {/* Identité */}
                  {activeSection === "identification" && (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center overflow-hidden">
                            {photo ? (
                              <img
                                src={photo}
                                alt="Photo de profil"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Camera size={22} className="opacity-40" />
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="btn btn-sm btn-outline gap-1.5">
                            <Camera size={14} />
                            {photo ? "Changer la photo" : "Ajouter une photo"}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handlePhotoChange}
                            />
                          </label>
                          {photo && (
                            <button
                              type="button"
                              onClick={() => setPhoto("")}
                              className="text-xs text-error self-start"
                            >
                              Retirer la photo
                            </button>
                          )}
                        </div>
                      </div>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Nom"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                      />
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Prénom"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                      />
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Titre professionnel (ex. Développeur Frontend)"
                        onChange={(e) => setJobName(e.target.value)}
                        value={jobName}
                      />
                    </div>
                  )}

                  {/* À propos */}
                  {activeSection === "about" && (
                    <div className="flex flex-col gap-3">
                      <textarea
                        className="textarea textarea-bordered w-full min-h-32"
                        placeholder="Donnez une courte description de vous..."
                        onChange={(e) => setAbout(e.target.value)}
                        value={about}
                      ></textarea>
                    </div>
                  )}

                  {/* Contact */}
                  {activeSection === "contact" && (
                    <div className="flex flex-col gap-3">
                      <input
                        type="tel"
                        className="input input-bordered w-full"
                        placeholder="Numéro de téléphone"
                        onChange={(e) => setNumber(e.target.value)}
                        value={number}
                      />
                      <div>
                        <input
                          type="email"
                          className={`input input-bordered w-full ${
                            mailError ? "input-error" : ""
                          }`}
                          placeholder="Adresse mail"
                          onChange={(e) => setMail(e.target.value)}
                          value={mail}
                        />
                        {mailError && (
                          <p className="text-error text-xs mt-1">
                            Format d'adresse mail invalide
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          placeholder="Lien social (LinkedIn, GitHub...)"
                          onChange={(e) => setInputSocialMedia(e.target.value)}
                          value={inputSocialMedia}
                        />
                        <button
                          className="btn btn-primary btn-square"
                          type="button"
                          onClick={handleAddMedia}
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                      {socialMedias.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {socialMedias.map((sm) => (
                            <span key={sm} className="badge badge-outline gap-1 py-3">
                              {sm}
                              <button
                                type="button"
                                onClick={() => deleteMedia(sm)}
                                className="ml-1 opacity-60 hover:opacity-100"
                              >
                                <Trash2 size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Formation */}
                  {activeSection === "formation" && (
                    <div className="flex flex-col gap-3">
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Diplôme"
                        onChange={(e) => setDegree(e.target.value)}
                        value={degree}
                      />
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Établissement"
                        onChange={(e) => setInstitution(e.target.value)}
                        value={institution}
                      />
                      <div className="flex gap-2">
                        <input
                          type="number"
                          className="input input-bordered w-full"
                          placeholder="Année de début"
                          min={MIN_YEAR}
                          max={MAX_YEAR}
                          onChange={(e) => setStartYear(Number(e.target.value))}
                          value={startYear || ""}
                        />
                        <input
                          type="number"
                          className="input input-bordered w-full"
                          placeholder="Année de fin"
                          min={MIN_YEAR}
                          max={MAX_YEAR}
                          onChange={(e) => setEndYear(Number(e.target.value))}
                          value={endYear || ""}
                        />
                      </div>
                      <button
                        className="btn btn-primary btn-sm self-start gap-1.5"
                        type="button"
                        onClick={handleAddFormation}
                      >
                        <Plus size={16} /> Ajouter
                      </button>

                      {formation.length > 0 && (
                        <ul className="flex flex-col gap-2 mt-1">
                          {sortedFormation.map((f) => (
                            <li
                              key={f.id}
                              className="flex justify-between items-start gap-2 bg-base-200 rounded-lg px-3 py-2 text-sm"
                            >
                              <div>
                                <p className="font-medium">{f.degree}</p>
                                <p className="opacity-70">
                                  {f.institution} · {f.startYear} - {f.endYear}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => deleteFormation(f.id)}
                                className="btn btn-ghost btn-xs btn-square text-error"
                              >
                                <Trash2 size={14} />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Expérience */}
                  {activeSection === "experience" && (
                    <div className="flex flex-col gap-3">
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Entreprise / Lieu"
                        onChange={(e) => setPlace(e.target.value)}
                        value={place}
                      />
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Poste occupé"
                        onChange={(e) => setJobTitle(e.target.value)}
                        value={jobTitle}
                      />
                      <textarea
                        className="textarea textarea-bordered w-full min-h-24"
                        placeholder="Décrivez votre expérience..."
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                      ></textarea>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          className="input input-bordered w-full"
                          placeholder="Année de début"
                          min={MIN_YEAR}
                          max={MAX_YEAR}
                          onChange={(e) => setStartYearExp(Number(e.target.value))}
                          value={startYearExp || ""}
                        />
                        <input
                          type="number"
                          className="input input-bordered w-full"
                          placeholder="Année de fin"
                          min={MIN_YEAR}
                          max={MAX_YEAR}
                          onChange={(e) => setEndYearExp(Number(e.target.value))}
                          value={endYearExp || ""}
                        />
                      </div>
                      <button
                        className="btn btn-primary btn-sm self-start gap-1.5"
                        type="button"
                        onClick={handleAddExperience}
                      >
                        <Plus size={16} /> Ajouter
                      </button>

                      {experiences.length > 0 && (
                        <ul className="flex flex-col gap-2 mt-1">
                          {sortedExperiences.map((exp) => (
                            <li
                              key={exp.id}
                              className="flex justify-between items-start gap-2 bg-base-200 rounded-lg px-3 py-2 text-sm"
                            >
                              <div>
                                <p className="font-medium">
                                  {exp.jobTitle} — {exp.place}
                                </p>
                                <p className="opacity-70">
                                  {exp.startYear} - {exp.endYear}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => deleteExperiences(exp.id)}
                                className="btn btn-ghost btn-xs btn-square text-error"
                              >
                                <Trash2 size={14} />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Compétences */}
                  {activeSection === "skills" && (
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          placeholder="Ex. React, Gestion de projet..."
                          onChange={(e) => setSkill(e.target.value)}
                          value={skill}
                        />
                        <button
                          className="btn btn-primary btn-square"
                          type="button"
                          onClick={handleAddSkill}
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                      {skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {skills.map((s) => (
                            <span
                              key={s.id}
                              className="badge badge-outline gap-1 py-3"
                            >
                              {s.skillTitle}
                              <button
                                type="button"
                                onClick={() => deleteSkill(s.id)}
                                className="ml-1 opacity-60 hover:opacity-100"
                              >
                                <Trash2 size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>

        {/* ------------------------ Aperçu CV ------------------------ */}
        <div className={`${mobileView === "preview" ? "block" : "hidden"} lg:block`}>
          <ActiveModel
            initials={initials}
            firstName={firstName}
            lastName={lastName}
            jobName={jobName}
            number={number}
            mail={mail}
            socialMedias={socialMedias}
            skills={skills}
            formation={formation}
            about={about}
            experiences={experiences}
            sortedExperiences={sortedExperiences}
            sortedFormation={sortedFormation}
            photo={photo}
          />
        </div>
      </div>
    </div>
  );
};