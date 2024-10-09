'use client';

import { clientsList } from '@/mocks/clientsList';
import Table from './table';
import { useFilter } from '@/hooks/useFilter';
import InputSearch from '@/components/ui/Input-search';
import { selectCities, selectStatesUf, selectStatus } from '@/mocks/select';
import SelectSearch from '@/components/ui/select-search';

export default function Clients() {
  const {
    selectedState,
    setSelectedState,
    selectedStatus,
    setSelectedStatus,
    clearFilters,
    isSearching,
    setIsSearching,
    setSearchName,
    searchName,
    filteredData,
    setFilteredData,
    selectedCity,
    setSelectedCity,
  } = useFilter();

  const applyFilters = () => {
    const filtered = clientsList.filter((client) => {
      const matchesName = client.name
        .toLowerCase()
        .includes(searchName.toLowerCase());

      const matchesStatus =
        !selectedStatus || client.status === selectedStatus.value;

      const matchesState =
        !selectedState || client.address.state === selectedState.value;

      const matchesCity =
        !selectedCity || client.address.city === selectedCity.value;

      return matchesName && matchesStatus && matchesState && matchesCity;
    });

    setFilteredData(filtered);
  };

  const handleSubmit = () => {
    setIsSearching(true);
    applyFilters();
  };

  return (
    <>
      <div className="border-b-[1.5px] border-b-gray-600/75 py-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <InputSearch
              placeholder="Digite o nome do cliente"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />

            <SelectSearch
              className="w-32"
              placeholder="Status"
              options={selectStatus}
              value={selectedStatus}
              onChange={(value) => setSelectedStatus(value)}
            />

            <SelectSearch
              className="w-28"
              placeholder="Estado"
              options={selectStatesUf}
              value={selectedState}
              onChange={(value) => setSelectedState(value)}
            />

            <SelectSearch
              className="w-44"
              placeholder="Cidade"
              options={selectCities}
              value={selectedCity}
              onChange={(value) => setSelectedCity(value)}
            />
          </div>
          {isSearching ? (
            <button
              onClick={clearFilters}
              type="button"
              className="bg-blue-700 text-white w-24 h-9 rounded-2xl align-middle"
            >
              Limpar
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              type="button"
              className="bg-blue-700 text-white w-24 h-9 rounded-2xl align-middle"
            >
              Buscar
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto mt-16 mb-4">
        <Table clients={filteredData} />
      </div>
    </>
  );
}
