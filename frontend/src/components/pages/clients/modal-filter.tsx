import InputSearch from '@/components/ui/Input-search';
import SelectSearch from '@/components/ui/select-search';
import { useFilter } from '@/hooks/useFilter';
import {
  selectCities,
  selectGender,
  selectProfilePurchase,
  selectStatesUf,
  selectStatus,
} from '@/mocks/select';
import { useFindClients } from '@/services/clients';
import { filteringOptionsAddresses } from '@/utilities/formattedDataFilters';

interface IModalFilterProps {
  isSearching: boolean;
  handleSubmit: () => void;
  clearFilters: () => void;
  setIsOpenModalFilters: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalFilter({
  isSearching,
  handleSubmit,
  clearFilters,
  setIsOpenModalFilters,
}: IModalFilterProps) {
  const {
    selectedState,
    setSelectedState,
    selectedStatus,
    setSelectedStatus,
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
    searchCEP,
    setSearchCEP,
    selectedTypeResidence,
    setSelectedTypeResidence,
  } = useFilter();

  const { data } = useFindClients();

  if (!data) return;

  const cities = filteringOptionsAddresses(data, 'city');
  const states = filteringOptionsAddresses(data, 'state');
  const typeResidence = filteringOptionsAddresses(data, 'typeResidence');

  return (
    <div className="absolute top-1 w-96 h-auto z-10 bg-[#1f1d1d] px-3 py-6 rounded-md border border-gray-600">
      <h1 className="text-2xl font-semibold text-white mb-4">Filtragem</h1>

      <div className="flex flex-col space-y-2 mb-8">
        <InputSearch
          placeholder="Digite o nome do cliente"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <InputSearch
          placeholder="Digite o CEP"
          value={searchCEP}
          onChange={(e) => setSearchCEP(e.target.value)}
        />

        <SelectSearch
          className="w-32"
          placeholder="Status"
          options={selectStatus}
          value={selectedStatus}
          onChange={(value) => setSelectedStatus(value)}
        />

        <SelectSearch
          className="w-44"
          placeholder="Gênero"
          options={selectGender}
          value={selectedGender}
          onChange={(value) => setSelectedGender(value)}
        />

        <SelectSearch
          className="w-60"
          placeholder="Nível do perfil de compra"
          options={selectProfilePurchase}
          value={selectedProfilePurchase}
          onChange={(value) => setSelectedProfilePurchase(value)}
        />

        <SelectSearch
          className="w-60"
          placeholder="Tipo de residência"
          options={typeResidence}
          value={selectedTypeResidence}
          onChange={(value) => setSelectedTypeResidence(value)}
        />

        <SelectSearch
          className="w-28"
          placeholder="Estado"
          options={states}
          value={selectedState}
          onChange={(value) => setSelectedState(value)}
        />

        <SelectSearch
          className="w-44"
          placeholder="Cidade"
          options={cities}
          value={selectedCity}
          onChange={(value) => setSelectedCity(value)}
        />

        {/* <InputSearch
          value={selectedDDD || ''}
          onChange={(e) => setSelectedDDD(e.target.value)}
          placeholder="Digite o DDD"
        /> */}
      </div>

      <div className="flex gap-4">
        {isSearching ? (
          <button
            onClick={clearFilters}
            type="button"
            className="bg-green-500 text-white w-24 h-9 rounded-2xl align-middle hover:bg-green-700 transition duration-300"
          >
            Limpar
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            type="button"
            className="bg-green-500 text-white w-24 h-9 rounded-2xl align-middle hover:bg-green-700 transition duration-300"
          >
            Buscar
          </button>
        )}

        <button
          className="bg-red-500 text-white w-24 h-9 rounded-2xl align-middle hover:bg-red-700 transition duration-300"
          type="button"
          onClick={() => setIsOpenModalFilters(false)}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
