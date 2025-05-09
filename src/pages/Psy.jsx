import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import data from "../assets/data/psychologues_tout_madagascar.json";
import PsyItem from "../components/PsyItem";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { applyAllFilters } from "../utils/function";

const Psy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    region: "",
    disponibilite: "",
  });

  const filteredData = useMemo(() => {
    return applyAllFilters(data, {
      searchTerm,
      region: filters.region,
      disponibilite: filters.disponibilite,
    });
  }, [searchTerm, filters]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const clearFilters = () => {
    setFilters({
      region: "",
      disponibilite: "",
    });
  };

  return (
    <div className="w-full md:w-3/4 lg:w-1/2 mx-auto px-4 py-8 mt-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Psychologues à Madagascar
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {filteredData.length} professionnels certifiés
        </p>
      </div>

      <div className="mb-6 space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher par nom, spécialité ou adresse..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white/50 dark:bg-slate-800/50 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus-within:outline-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleFilters}
            className="flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-white/50 dark:bg-slate-800/50 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            <FunnelIcon className="h-4 w-4 mr-1" />
            Filtres
          </button>

          {(filters.region || filters.disponibilite) && (
            <button
              onClick={clearFilters}
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >
              Réinitialiser
            </button>
          )}
        </div>

        {showFilters && (
          <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg bg-white/50 dark:bg-slate-800/50">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Région
                </label>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg bg-white/50 dark:bg-slate-800/50 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={filters.region}
                  onChange={(e) =>
                    setFilters({ ...filters, region: e.target.value })
                  }
                >
                  <option value="">Toutes les régions</option>
                  <option value="Antananarivo">Antananarivo</option>
                  <option value="Autres">Autres régions</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Disponibilité
                </label>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg bg-white/50 dark:bg-slate-800/50 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={filters.disponibilite}
                  onChange={(e) =>
                    setFilters({ ...filters, disponibilite: e.target.value })
                  }
                >
                  <option value="">Toutes les disponibilités</option>
                  <option value="En ligne">En ligne</option>
                  <option value="Domicile">À domicile</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <ScrollToTopButton />

      {filteredData.length > 0 ? (
        <div className="space-y-4">
          {filteredData.map((psy) => (
            <PsyItem key={psy.onpm} psy={psy} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            Aucun psychologue ne correspond à votre recherche.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              clearFilters();
            }}
            className="mt-2 text-sm text-purple-600 dark:text-purple-400 hover:underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};

export default Psy;
