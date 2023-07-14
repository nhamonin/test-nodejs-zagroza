export function getTableConfig(headers, tables) {
  const headersArr = headers[0]?.split(';');

  if (!headersArr) {
    return null;
  }

  for (const table of tables) {
    if (
      table.headers.every((header) => headersArr.includes(header)) &&
      table.headers.length === headersArr.length
    ) {
      return table;
    }
  }
  return null;
}
