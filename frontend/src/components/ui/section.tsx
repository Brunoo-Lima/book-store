// import { SectionType } from '../pages/clients/forms/alter/modal';

// interface SectionProps {
//   title: string;
//   isEditing: boolean;
//   children: React.ReactNode;
//   sectionType: SectionType;
//   startEditingSection: (section: SectionType) => void;
//   stopEditingSection: () => void;
// }

// export const Section: React.FC<SectionProps> = ({
//   title,
//   isEditing,
//   children,
//   startEditingSection,
//   stopEditingSection,
//   sectionType,
// }) => (
//   <div className="flex flex-col gap-2">
//     <h2 className="text-lg font-semibold">{title}</h2>
//     {children}
//     {isEditing ? (
//       <button
//         className="bg-red-400 rounded-md w-full h-8 flex items-center justify-center font-semibold"
//         type="button"
//         onClick={stopEditingSection}
//       >
//         Salvar
//       </button>
//     ) : (
//       <button
//         className="bg-red-400 rounded-md w-full h-8 flex items-center justify-center font-semibold"
//         type="button"
//         onClick={() => startEditingSection(sectionType)}
//       >
//         Editar
//       </button>
//     )}
//   </div>
// );
