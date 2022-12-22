import { PrimeColor } from './PrimeColors';

export class Sliders {
  private _sliders: Slider[];

  constructor() {
    this._sliders = [];
  }

  add(slider: Slider) {
    this._sliders.push(slider);

    return this;
  }

  // Add a new slider to the Sliders object
  addSlider(dft: number, from?: number, to?: number, step?: number) {
    // If we already have 3 sliders, do not add another one
    if (this._sliders.length >= 3) return this;

    // Add new slider to the sliders array
    this._sliders.push(
      // Create the new slider, setting the default value and other optional values
      Slider.set(dft).from(from).to(to).step(step).colorIndex(this._sliders.length)
    );

    return this;
  }

  // Reset all sliders to their default values
  reset() {
    this._sliders = this._sliders.map((s) => s.reset());

    return this;
  }

  // Are all sliders equal?
  get allEqual() {
    return this._sliders.every((s) => s.value == this._sliders[0].value);
  }

  get sliders() {
    return this._sliders;
  }

  get values() {
    return this._sliders.map((s) => s.value);
  }

  // Get the value of a slider by its index
  private getSlider(index: number) {
    if (this._sliders.length < index) return 0;

    return this._sliders[index].value;
  }

  // Get the value of the first slider
  get x() {
    return this.getSlider(0);
  }

  // Get the value of the second slider
  get y() {
    return this.getSlider(1);
  }

  // Get the value of the third slider
  get z() {
    return this.getSlider(2);
  }
}

/**
 * The Slider class is used to create a slider with a default value and a range of values.
 * The default values are set to 0, -1, 1, and 0.1.
 * The default color is ultramarine.
 *
 * @param defaultValue The default value for the slider
 * @param min The minimum value for the slider
 * @param max The maximum value for the slider
 * @param step The step size for the slider
 * @param color The color of the slider
 */

export class Slider {
  defaultValue = 0;
  min = -1;
  max = 1;
  stepSize = 0.1;
  value = 0;
  color: string = PrimeColor.ultramarine;

  constructor(
    defaultValue: number,
    min = -1,
    max = 1,
    step = 0.1,
    color: string = PrimeColor.ultramarine
  ) {
    this.defaultValue = defaultValue;
    this.min = min;
    this.max = max;
    this.stepSize = step;
    this.value = defaultValue;
    this.color = color;
  }

  static Default = new Slider(0);

  static set(dft = 0) {
    return new Slider(dft);
  }

  from(min = -1) {
    this.min = min;

    return this;
  }

  to(max = 1) {
    this.max = max;

    return this;
  }

  step(stp = 0.1) {
    this.stepSize = stp;

    return this;
  }

  colorIndex(num: number) {
    const colors = Object.values(PrimeColor);

    this.color = colors[num];

    return this;
  }

  grey() {
    this.color = PrimeColor.grey;
    return this;
  }

  yellow() {
    this.color = PrimeColor.yellow;
    return this;
  }

  blue() {
    this.color = PrimeColor.ultramarine;
    return this;
  }

  pink() {
    this.color = PrimeColor.pink;
    return this;
  }

  green() {
    this.color = PrimeColor.green;
    return this;
  }

  red() {
    this.color = PrimeColor.red;
    return this;
  }

  reset() {
    this.value = this.defaultValue;

    return this;
  }
}

export type SliderArray =
  | readonly []
  | readonly [Slider]
  | readonly [Slider, Slider]
  | readonly [Slider, Slider, Slider];
