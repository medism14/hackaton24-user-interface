// import React, { useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
// import { User } from '../../pages/Users/Users';

// interface ModalEditProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onSave: (data: User) => void;
//     title: string;
//     children: React.ReactNode;
//     initialData: User | null;
// }



// const ModalEdit: React.FC<ModalEditProps> = ({
//     isOpen,
//     onClose,
//     onSave,
//     title,
//     children,
//     initialData
// }) => {
//     // Empêcher le scroll du body quand le modal est ouvert
//     useEffect(() => {
//         if (isOpen) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = 'unset';
//         }
//         return () => {
//             document.body.style.overflow = 'unset';
//         };
//     }, [isOpen]);

//     const handleSave = () => {
//         if (initialData) {
//             onSave(initialData);
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto overflow-x-hidden px-4 py-6 sm:px-6 md:py-12">
//             <div
//                 className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
//             />

//             <div className="relative w-full max-w-xl transform rounded-2xl transition-all">
//                 <div className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-boxdark">
//                     {/* Header */}
//                     <div className="flex items-center justify-between border-b border-stroke p-4 dark:border-strokedark sm:p-6">
//                         <h3 className="text-xl font-semibold text-black dark:text-white sm:text-2xl">
//                             {title}
//                         </h3>
//                         <button
//                             onClick={onClose}
//                             className="rounded-lg p-2 text-black transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-meta-4"
//                             aria-label="Fermer"
//                         >
//                             <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
//                         </button>
//                     </div>

//                     {/* Body */}
//                     <div className="max-h-[calc(100vh-16rem)] overflow-y-auto p-4 sm:p-6">
//                         <div className="space-y-6">
//                             {React.Children.map(children, child => {
//                                 if (React.isValidElement(child)) {
//                                     const name = child.props.name as keyof User;
//                                     return React.cloneElement(child, {
//                                         defaultValue: initialData?.[name] || '',
//                                         value: initialData?.[name] || '',
//                                         onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//                                             if (initialData) {
//                                                 const updatedData = {
//                                                     ...initialData,
//                                                     [name]: e.target.value
//                                                 };
//                                                 onSave(updatedData);
//                                             }
//                                         }
//                                     });
//                                 }
//                                 return child;
//                             })}
//                         </div>
//                     </div>

//                     {/* Footer */}
//                     <div className="flex flex-col-reverse gap-3 border-t border-stroke p-4 dark:border-strokedark sm:flex-row sm:items-center sm:justify-end sm:p-6">
//                         <button
//                             className="w-full rounded-lg px-6 py-2.5 text-sm font-medium text-white bg-red-500 transition-colors hover:bg-red-600 sm:w-auto"
//                             onClick={onClose}
//                         >
//                             Annuler
//                         </button>
//                         <button
//                             className="w-full rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark sm:w-auto"
//                             onClick={handleSave}
//                         >
//                             Enregistrer
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ModalEdit;
