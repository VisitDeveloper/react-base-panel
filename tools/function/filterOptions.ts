export function filterOptions(
    activeOptions: Array<string>,
    label: string
  ): Array<string> {
    return activeOptions.filter((optionLabel) => optionLabel !== label);
  }
  