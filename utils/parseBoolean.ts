export default function parseBoolean(
  value: string | undefined,
): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return undefined;
}
