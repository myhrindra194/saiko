/* eslint-disable react/prop-types */
import { UserIcon } from "@heroicons/react/24/outline";

const PsyCard = ({ psy }) => {
  return (
    <div className="p-6 rounded-lg shadow-lg bg-white/50 hover:bg-white/70 dark:bg-slate-800/50 dark:hover:bg-slate-700/50 border border-gray-200 dark:border-slate-700 group">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
            <UserIcon className="h-6 w-6 text-purple-500" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white max-w-3/5">
              {psy.nom}
            </h2>
            <span className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-0.5 rounded-full">
              {psy.onpm}
            </span>
          </div>

          <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
            {psy.specialite}
          </p>

          {psy.adresse && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              {psy.adresse}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            {psy.telephone && (
              <a
                href={`tel:${psy.telephone.replace(/[^0-9+]/g, "")}`}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
              >
                {psy.telephone}
              </a>
            )}

            {psy.email && (
              <a
                href={`mailto:${psy.email}`}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
              >
                {psy.email}
              </a>
            )}
          </div>

          {psy.disponibilites && psy.disponibilites.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Disponibilités:
              </p>
              <div className="flex flex-wrap gap-1">
                {psy.disponibilites.map((dispo, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full"
                  >
                    {dispo}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PsyCard;
