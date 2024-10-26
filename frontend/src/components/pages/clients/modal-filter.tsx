import InputSearch from '@/components/ui/Input-search';
import SelectSearch from '@/components/ui/select-search';
import { useFilter } from '@/hooks/useFilter';
import { selectCities, selectStatesUf, selectStatus } from '@/mocks/select';

interface IModalFilterProps {
  isSearching: boolean;
  handleSubmit: () => void;
  clearFilters: () => void;
}

export default function ModalFilter({
  isSearching,
  handleSubmit,
  clearFilters,
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
  } = useFilter();

  return (
    <div className="absolute top-1 w-96 h-screen z-10 bg-slate-800">
      Filtros
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
  );
}
