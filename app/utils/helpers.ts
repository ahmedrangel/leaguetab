export const adjustScale = (document: Document, id: string) => {
  const referenceWidth = 1920;
  const referenceHeight = 0;
  const currentWidth = document.documentElement.clientWidth;
  const currentHeight = document.documentElement.clientHeight;
  const scaleX = currentWidth / referenceWidth;
  const scaleY = currentHeight / referenceHeight;
  const scale = Math.min(scaleX, scaleY);
  const app = document.getElementById(id);
  if (!app) return;
  const translate = `translate(-50%, -50%) scale(${scale})`;
  app.style.transform = translate;
};
export const getChampionIcon = (cdn: string, version: string, file: string) => `${cdn}/${version}/img/champion/${file}`;
export const getSummonerSpellIcon = (cdn: string, version: string, file: string) => `${cdn}/${version}/img/spell/${file}`;
export const getItemIcon = (cdn: string, version: string, file: string) => `${cdn}/${version}/img/item/${file}`;
export const getRuneIcon = (cdn: string, file: string) => `${cdn}/img/${file}`;
