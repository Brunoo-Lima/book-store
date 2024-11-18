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
  } = useFilter();

  return (
    <div className="absolute top-1 w-96 h-auto z-10 bg-slate-800 p-3 rounded-md">
      <h1 className="text-lg font-semibold text-white">Filtragem</h1>

      <div className="flex flex-col space-y-2 mb-4">
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

        <SelectSearch
          className="w-44"
          placeholder="Gênero"
          options={selectGender}
          value={selectedGender}
          onChange={(value) => setSelectedGender(value)}
        />

        <SelectSearch
          className="w-56"
          placeholder="Nível do perfil de compra"
          options={selectProfilePurchase}
          value={selectedProfilePurchase}
          onChange={(value) => setSelectedProfilePurchase(value)}
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

        <button
          className="bg-red-500 text-white w-24 h-9 rounded-2xl align-middle"
          type="button"
          onClick={() => setIsOpenModalFilters(false)}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
