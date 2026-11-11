import type { Category } from "../../types/campus-event";
interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: Category | "") => void;
}
export default function EventFilter({ searchText, category, categories, onSearchChange, onCategoryChange }: EventFilterProps) {
  return <form className="filtre" onSubmit={e => e.preventDefault()}>
          <label htmlFor="arama">Etkinlik ara
            <input id="arama" type="search" value={searchText} onChange={e => onSearchChange(e.target.value)} placeholder="atölye, kariyer..." />
          </label>
          <label htmlFor="kategori-filtre">Kategori
            <select id="kategori-filtre" value={category} onChange={e => onCategoryChange(e.target.value as Category | "")}>
              <option value="">Tümü</option>{categories.map(value => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
        </form>;
}

