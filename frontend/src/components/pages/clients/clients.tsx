'use client';

import Table from './table';
import { useFilter } from '@/hooks/useFilter';
import { useEffect, useState } from 'react';
import { IClient } from '@/@types/client';
import { findClients } from '@/services/clients';
import handleError from '@/utilities/handle-toast';
import ModalFilter from './modal-filter';

export default function Clients() {
  const {
    selectedState,
    setSelectedState,
    selectedStatus,
    setSelectedStatus,
    setIsSearching,
    isSearching,
    setSearchName,
    searchName,
    selectedCity,
    setSelectedCity,
    selectedGender,
    setSelectedGender,
    selectedProfilePurchase,
    setSelectedProfilePurchase,
    selectedDDD,
    setSelectedDDD,
  } = useFilter();

  const [filteredData, setFilteredData] = useState<IClient[]>([]);
  const [isOpenModalFilters, setIsOpenModalFilters] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const clientsData = await findClients();

      const validClients = clientsData.filter(
        (client): client is IClient => client !== undefined
      );

      setFilteredData(validClients);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  const applyFilters = async () => {
    try {
      const clientsData = await findClients();

      const filtered = clientsData.filter((client) => {
        const matchesName = client.name
          .toLowerCase()
          .includes(searchName.toLowerCase());

        const matchesStatus =
          !selectedStatus || client.statusClient === selectedStatus.value;

        const matchesState =
          !selectedState || client.addresses[0].state === selectedState.value;

        const matchesCity =
          !selectedCity || client.addresses[0].city === selectedCity.value;

        const matchesGender =
          !selectedGender || client.gender === selectedGender.value;

        const matchesProfilePurchase =
          !selectedProfilePurchase ||
          client.profilePurchase === selectedProfilePurchase.value;

        const matchesDDD = !selectedDDD || client.phones[0].ddd === selectedDDD;

        return (
          matchesName &&
          matchesStatus &&
          matchesState &&
          matchesCity &&
          matchesGender &&
          matchesProfilePurchase &&
          matchesDDD
        );
      });

      setFilteredData(filtered);
    } catch (err) {
      handleError(err);
    }
  };

  const handleSubmit = () => {
    setIsSearching(true);
    applyFilters();
    setIsOpenModalFilters(false);
  };

  const clearFilters = async () => {
    setSelectedState(null);
    setSelectedStatus(null);
    setSearchName('');
    setSelectedCity(null);
    setFilteredData([]);
    await fetchClients();
    setIsSearching(false);
    setSelectedGender(null);
    setSelectedProfilePurchase(null);
    setSelectedDDD('');
  };

  return (
    <>
      <div className="border-b-[1.5px] border-b-gray-600/75 py-6 relative">
        <div className="flex justify-between items-center">
          <button
            className="w-56 h-10 bg-green-500 text-white font-semibold text-lg rounded-md border-none hover:bg-green-700 transition duration-300"
            type="button"
            onClick={() => setIsOpenModalFilters(true)}
          >
            Filtros
          </button>

          {isOpenModalFilters && (
            <ModalFilter
              isSearching={isSearching}
              handleSubmit={handleSubmit}
              clearFilters={clearFilters}
              setIsOpenModalFilters={setIsOpenModalFilters}
            />
          )}
        </div>
      </div>

      <div className="overflow-x-auto mt-16 mb-4 relative">
        {filteredData.length > 0 ? (
          <Table clients={filteredData} fetchClients={fetchClients} />
        ) : (
          <p className="text-center font-bold text-md">
            Nenhum cliente encontrado
          </p>
        )}
      </div>
    </>
  );
}
