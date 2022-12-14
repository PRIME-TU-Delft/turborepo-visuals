type ColorString = `#${string}`;

export enum BackgroundColors {
  dark = '#1A1A1A',
  medium = '#CFC7C0',
  light = '#E0E0E0'
}

export enum PrimeColor {
  red = '#E15F55',
  yellow = '#FFCE2E',
  green = '#308167',
  ultramarine = '#7AB1E8',
  pink = '#F87089',
  grey = '#CFC7C0',
  black = '#000000'
}

export const primeColorArray = Object.values(PrimeColor);

export default function getRandomColor(): ColorString {
  const colors = Object.values(PrimeColor);

  const randomIndex = Math.round(Math.random() * colors.length);

  return colors[randomIndex];
}

export function getColor(index: number): ColorString {
  const colors = Object.values(PrimeColor);

  return colors[index % colors.length];
}
