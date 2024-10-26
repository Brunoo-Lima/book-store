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
  } = useFilter();

  const [filteredData, setFilteredData] = useState<IClient[]>([]);
  const [isOpenModalFilters, setIsOpenModalFilters] = useState<boolean>(false);

  const fetchClients = async () => {
    try {
      const clientsData = await findClients();

      const validClients = clientsData.filter(
        (client): client is IClient => client !== undefined
      );

      setFilteredData(validClients);
    } catch (error) {
      console.error('Erro ao buscar clientes', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const applyFilters = async () => {
    try {
      const clientsData = await findClients();

      const filtered = clientsData.filter((client) => {
        const matchesName = client.name
          .toLowerCase()
          .includes(searchName.toLowerCase());

        const matchesStatus =
          !selectedStatus || client.status === selectedStatus.value;

        const matchesState =
          !selectedState || client.addresses[0].state === selectedState.value;

        const matchesCity =
          !selectedCity || client.addresses[0].city === selectedCity.value;

        return matchesName && matchesStatus && matchesState && matchesCity;
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
  };

  return (
    <>
      <div className="border-b-[1.5px] border-b-gray-600/75 py-6 relative">
        <div className="flex justify-between items-center">
          <button onClick={() => setIsOpenModalFilters(!isOpenModalFilters)}>
            Filtros
          </button>

          {isOpenModalFilters && (
            <ModalFilter
              isSearching={isSearching}
              handleSubmit={handleSubmit}
              clearFilters={clearFilters}
            />
          )}
        </div>
      </div>

      <div className="overflow-x-auto mt-16 mb-4 relative">
        {filteredData.length > 0 ? (
          <Table clients={filteredData} />
        ) : (
          <p className="text-center font-bold text-md">
            Nenhum cliente encontrado
          </p>
        )}
      </div>
    </>
  );
}
