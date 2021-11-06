const FAVORITE_LOCATIONS = "favorites Locations"


export const saveFavorites = (favorites:any) => {
  localStorage.setItem(FAVORITE_LOCATIONS, JSON.stringify(favorites))
}

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem(FAVORITE_LOCATIONS) || '[]');
}