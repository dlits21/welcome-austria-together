
const imageMap: { [key: string]: any } = {
  'abdul': require('../assets/images/abdul.png'),
  'amina': require('../assets/images/amina.png'),
  'liridon': require('../assets/images/liridon.png'),
  'fatima': require('../assets/images/fatima.png'),
  'giorgi': require('../assets/images/giorgi.png'),
  'leila': require('../assets/images/leila.png'),
  'maryam': require('../assets/images/maryam.png'),
  'nino': require('../assets/images/nino.png'),
  'omar': require('../assets/images/omar.png'),
  'rustam': require('../assets/images/rustam.png'),
  'arlinda': require('../assets/images/arlinda.png'),
  'timur': require('../assets/images/timur.png'),
  'zainab': require('../assets/images/zainab.png'),
};

export function getCharacterImage(name: string): any {
  const key = name.toLowerCase();
  return imageMap[key] || require('../assets/images/fatima.png'); // fallback image
}