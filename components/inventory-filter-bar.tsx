import { Filter, RotateCcw, Search } from "lucide-react";
import Link from "next/link";

import {
  importStatusLabels,
  sortLabels
} from "@/lib/inventory";
import {
  importStatusOptions,
  sortOptions,
  type InventoryFiltersData,
  type InventorySearchParams
} from "@/lib/queries";

type InventoryFilterBarProps = {
  filters: InventoryFiltersData;
  values: InventorySearchParams;
};

export function InventoryFilterBar({
  filters,
  values
}: InventoryFilterBarProps) {
  return (
    <form
      action="/inventory"
      className="glass-card grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-[1.1fr_0.85fr_0.85fr_1.1fr_1.2fr_auto_auto]"
    >
      <div className="flex items-center gap-2 md:col-span-2 lg:col-span-7">
        <Filter aria-hidden className="text-brandRed" size={20} />
        <h2 className="text-lg font-black">Filtros de inventario</h2>
      </div>

      <label className="space-y-2">
        <span className="text-xs font-bold uppercase text-muted">Marca</span>
        <select className="field px-3" defaultValue={values.make ?? ""} name="make">
          <option value="">Todas</option>
          {filters.makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2">
        <span className="text-xs font-bold uppercase text-muted">Ano minimo</span>
        <input
          className="field px-3"
          defaultValue={values.minYear ?? ""}
          inputMode="numeric"
          max={filters.bounds.maxYear}
          min={filters.bounds.minYear}
          name="minYear"
          placeholder={filters.bounds.minYear?.toString() ?? "2015"}
          type="number"
        />
      </label>

      <label className="space-y-2">
        <span className="text-xs font-bold uppercase text-muted">Ano maximo</span>
        <input
          className="field px-3"
          defaultValue={values.maxYear ?? ""}
          inputMode="numeric"
          max={filters.bounds.maxYear}
          min={filters.bounds.minYear}
          name="maxYear"
          placeholder={filters.bounds.maxYear?.toString() ?? "2026"}
          type="number"
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase text-muted">Precio min</span>
          <input
            className="field px-3"
            defaultValue={values.minPrice ?? ""}
            inputMode="numeric"
            min={filters.bounds.minPrice}
            name="minPrice"
            placeholder="USD"
            type="number"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase text-muted">Precio max</span>
          <input
            className="field px-3"
            defaultValue={values.maxPrice ?? ""}
            inputMode="numeric"
            min={filters.bounds.minPrice}
            name="maxPrice"
            placeholder="USD"
            type="number"
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-xs font-bold uppercase text-muted">Estado</span>
        <select
          className="field px-3"
          defaultValue={values.status ?? ""}
          name="status"
        >
          <option value="">Todos</option>
          {importStatusOptions.map((status) => (
            <option key={status} value={status}>
              {importStatusLabels[status]}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2">
        <span className="text-xs font-bold uppercase text-muted">Ordenar</span>
        <select
          className="field px-3"
          defaultValue={values.sort ?? "newest"}
          name="sort"
        >
          {sortOptions.map((sort) => (
            <option key={sort} value={sort}>
              {sortLabels[sort]}
            </option>
          ))}
        </select>
      </label>

      <div className="flex items-end gap-2">
        <button className="btn-primary w-full px-4" type="submit">
          <Search aria-hidden size={18} />
          Buscar
        </button>
        <Link
          aria-label="Limpiar filtros"
          className="btn-secondary aspect-square min-h-[2.75rem] w-[2.75rem]"
          href="/inventory"
        >
          <RotateCcw aria-hidden size={18} />
        </Link>
      </div>
    </form>
  );
}
