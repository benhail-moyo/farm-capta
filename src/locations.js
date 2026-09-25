export const sampleGPS = {
  1: "-17.32, 30.97",
  2: "-18.13, 30.15",
  3: "-18.97, 32.67",
  4: "-18.92, 29.82",
  5: "-17.30, 31.33",
};

export function parseGPS(value) {
  if (typeof value !== "string") return null;
  const parts = value.split(",");
  if (parts.length !== 2 || parts.some((part) => !part.trim())) return null;
  const [lat, lng] = parts.map(Number);
  return Number.isFinite(lat) && Number.isFinite(lng) &&
    Math.abs(lat) <= 90 && Math.abs(lng) <= 180 ? [lat, lng] : null;
}

export function migrateFarmLocations(state) {
  return { ...state, farms: state.farms.map((farm) =>
    farm.owner === `sample-${farm.id}` && farm.gps === sampleGPS[1] && sampleGPS[farm.id]
      ? { ...farm, gps: sampleGPS[farm.id] } : farm,
  ) };
}
