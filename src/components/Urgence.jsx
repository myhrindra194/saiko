import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import {
  emergencyContacts,
  mentalHealthResources,
  mentalHealthTips,
} from "../utils/data";

const Urgence = () => {
  return (
    <div className="md:w-1/4 bg-white/50 dark:bg-slate-800/50 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 h-fit sticky top-20">
      <div className="mb-4">
        <h3 className="font-medium  flex items-center text-purple-700 dark:text-purple-300 mb-2">
          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
          Ressources Spécifiques
        </h3>
        <div className="space-y-3">
          {mentalHealthResources.map((resource, index) => (
            <div
              key={index}
              className="flex flex-col p-3 bg-gray-50/50 dark:bg-slate-700/30 rounded-lg border border-gray-200 dark:border-slate-600 "
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-gray-300 ">
                  {resource.name}
                </span>
                <div className="flex items-center text-purple-600 dark:text-purple-400 ">
                  <PhoneIcon className="w-4 h-4 mr-1" />
                  <span>{resource.number}</span>
                </div>
              </div>
              {resource.free && (
                <div className="mt-1 text-sm text-green-600 dark:text-green-400">
                  Appel gratuit
                </div>
              )}
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {resource.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium flex items-center text-purple-700 dark:text-purple-300 mb-2">
          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
          Urgences Générales
        </h3>
        <div className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <div
              key={index}
              className="flex flex-col p-3 bg-gray-50/50 dark:bg-slate-700/30 rounded-lg border border-gray-200 dark:border-slate-600"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-gray-300">
                  {contact.name}
                </span>
                <div className="flex items-center text-purple-600 dark:text-purple-400">
                  <PhoneIcon className="w-4 h-4 mr-1" />
                  <span>{contact.number}</span>
                </div>
              </div>
              {contact.free && (
                <div className="mt-1 text-sm text-green-600 dark:text-green-400">
                  Appel gratuit
                </div>
              )}
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {contact.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-50/50 dark:bg-purple-900/10 p-3 rounded-lg border border-purple-200 dark:border-purple-800/50 mb-4">
        <h3 className="font-medium text-sm flex items-center text-purple-700 dark:text-purple-300 mb-2">
          <InformationCircleIcon className="w-4 h-4 mr-1" />
          Conseils Santé Mentale
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          {mentalHealthTips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="text-purple-500 mr-1">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>
          Votre santé mentale compte. N&apos;hésitez pas à contacter ces
          services en cas de besoin. Les numéros en{" "}
          <span className="text-green-600 dark:text-green-400">vert</span> sont
          gratuits.
        </p>
      </div>
    </div>
  );
};

export default Urgence;
