export const UserDetails = JSON.parse(localStorage.getItem("user"));

export function capitalizeFirstLetter(string) {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}
