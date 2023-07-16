import { ref, computed } from "#imports";
import { useQueryParamInitialValue } from "./useQueryParamInitialValue";

const filterOperations = ["=", "!=", "includes", ">", "<"] as const;
const sorterOperations = ["asc", "desc"] as const;

export type CsvFilter = {
  key: string;
  op: (typeof filterOperations)[number];
  value: string;
};
export type CsvSorter = {
  key: string;
  op: (typeof sorterOperations)[number];
};
export type CsvSettings = {
  label: string;
  key: string;
  order: number;
  size: "sm" | "md" | "lg";
  span: "1" | "2" | "3" | "4" | "full";
  style: "standard" | "muted";
  visible: boolean;
  as: "list" | "cell" | "tag" | "details";
  labelSide: "top" | "left" | "right" | "bottom";
};
export type CsvState = {
  cellSpacing: "even" | "max" | "auto";
  cellGap: "sm" | "md" | "lg";
  tagPosition: "top" | "bottom";
  settingsOpen: boolean;
  limit: string;
};

type TOptions = Partial<{
  limitTo: number;
  initialFilters: CsvFilter[] | string;
  initialSorters: CsvSorter[] | string;
  initialSettings: CsvSettings[] | string;
  initialState: CsvState | string;
}>;

export const useCsvFiltering = (data: any[], options: TOptions = {}) => {
  const state = ref<CsvState>(
    useQueryParamInitialValue(options.initialState, {
      cellSpacing: "even",
      cellGap: "sm",
      tagPosition: "top",
      settingsOpen: false,
      limit:
        options.limitTo != null
          ? Math.min(options.limitTo, data.length) + ""
          : "",
    })
  );

  const headers = ref<CsvSettings[]>(
    useQueryParamInitialValue(
      options.initialSettings,
      Object.keys(data[0]).map((a, index) => ({
        label: a.replaceAll("_", " "),
        key: a,
        order: index + 1,
        size: "sm",
        visible: true,
        style: "standard",
        as: "cell",
        span: "1",
        labelSide: "top",
      }))
    )
  );

  const asNumber = (value: string) => {
    try {
      const asNum = Number(value.replaceAll(",", ""));
      if (!isNaN(asNum)) {
        return asNum;
      }
      const asDate = Date.parse(value);
      if (!isNaN(asDate)) {
        return asDate;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const applySorterOp = (
    left: string,
    right: string,
    op: (typeof sorterOperations)[number]
  ) =>
    ({
      asc: (a: string, b: string) => {
        const [numA, numB] = [asNumber(a), asNumber(b)];
        if (numA != null && numB != null) {
          return numA - numB;
        }
        return a.localeCompare(b);
      },
      desc: (a: string, b: string) => {
        const [numA, numB] = [asNumber(a), asNumber(b)];
        if (numA != null && numB != null) {
          return numB - numA;
        }
        return a.localeCompare(b) * -1;
      },
    }[op](left, right));

  const toSorter = ({ key, op }: CsvSorter) => {
    return (a: (typeof data)[0], b: (typeof data)[0]) =>
      applySorterOp(a[key], b[key], op);
  };

  const sorters = ref<CsvSorter[]>(
    useQueryParamInitialValue(options.initialSorters, [], [Array.isArray])
  );

  const applyFilterOp = (
    left: string,
    op: (typeof filterOperations)[number],
    right: string
  ) =>
    ({
      "=": (a: string, b: string) => {
        return a == b;
      },
      "!=": (a: string, b: string) => {
        return a != b;
      },
      includes: (a: string, b: string) => {
        return a.includes(b);
      },
      ">": (a: string, b: string) => {
        const [numA, numB] = [asNumber(a), asNumber(b)];
        if (numA != null && numB != null) {
          return numA > numB;
        }
        return a.localeCompare(b) === 1;
      },
      "<": (a: string, b: string) => {
        const [numA, numB] = [asNumber(a), asNumber(b)];
        if (numA != null && numB != null) {
          return numA < numB;
        }
        return a.localeCompare(b) === -1;
      },
    }[op](left, right));

  const toFilter = ({ key, op, value }: CsvFilter) => {
    return (a: (typeof data)[0]) => applyFilterOp(a[key], op, value);
  };

  const filters = ref<CsvFilter[]>(
    useQueryParamInitialValue(options.initialFilters, [], [Array.isArray])
  );
  const filteredData = computed(() => {
    let _data = [...data];
    filters?.value?.forEach?.((f) => {
      if (f.key && f.op && f.value) {
        _data = _data.filter(toFilter(f));
      }
    });
    sorters?.value?.forEach?.((f) => {
      if (f.key && f.op) {
        _data.sort(toSorter(f));
      }
    });
    if (state.value.limit) {
      _data = _data.slice(0, Number(state.value.limit));
    }
    return _data;
  });

  return {
    filters,
    sorters,
    filteredData,
    filterOperations,
    sorterOperations,
    state,
    headers,
  };
};
