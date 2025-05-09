/* eslint-disable react/prop-types */
import {
  CalendarIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const PsyItem = ({ psy }) => {
  return (
    <div className="p-4 mb-4 rounded-lg border border-gray-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:shadow-sm transition-shadow">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mt-1 flex-shrink-0">
          <UserIcon className="h-5 w-5 text-purple-500" />
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {psy.nom}
              </h3>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                {psy.specialite}
              </p>
            </div>

            {psy.disponibilite && (
              <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full">
                {psy.disponibilite}
              </span>
            )}
          </div>

          <div className="mt-3 space-y-2">
            {psy.adresse && (
              <div className="flex items-start text-sm">
                <MapPinIcon className="h-4 w-4 mt-0.5 mr-2 text-gray-500 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  {psy.adresse}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {psy.telephone && (
                <a
                  href={`tel:${psy.telephone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400"
                >
                  <PhoneIcon className="h-4 w-4 mr-1.5" />
                  {psy.telephone}
                </a>
              )}

              {psy.email && (
                <a
                  href={`mailto:${psy.email}`}
                  className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400"
                >
                  <EnvelopeIcon className="h-4 w-4 mr-1.5" />
                  {psy.email}
                </a>
              )}
            </div>

            {psy.disponibilites && psy.disponibilites.length > 0 && (
              <div className="pt-2">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                  <span>Disponibilités</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {psy.disponibilites.map((dispo, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 px-2.5 py-1 rounded-full"
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
    </div>
  );
};

export default PsyItem;
