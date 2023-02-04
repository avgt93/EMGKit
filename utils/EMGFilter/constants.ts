enum NOTCH_FREQUENCY {
  FREQ_50HZ = 50,
  FREQ_60HZ = 60,
}

enum SAMPLE_FREQUENCY {
  FREQ_500HZ = 500,
  FREQ_1000HZ = 1000,
}

//coefficients of transfer function of LPF
//[sampleFreqInd][order]
const lpf_numerator_coef: readonly number[][] = [
  [0.03913, 0.7827, 0.3913],
  [0.1311, 0.2622, 0.1311],
];
const lpf_denominator_coef: readonly number[][] = [
  [1.0, 0.3695, 0.1958],
  [1.0, -0.7478, 0.2722],
];

const hpf_numerator_coef: readonly number[][] = [
  [0.8371, -1.6742, 0.8371],
  [0.915, -1.8299, 0.915],
];
const hpf_denominator_coef: readonly number[][] = [
  [1.0, -1.6475, 0.7009],
  [1.0, -1.8227, 0.8372],
];

const ahf_numerator_coef_50Hz: readonly number[][] = [
  [0.9522, -1.5407, 0.9522, 0.8158, -0.8045, 0.0855],
  [0.5869, -1.1146, 0.5869, 1.0499, -2.0, 1.0499],
];
const ahf_denominator_coef_50Hz: readonly number[][] = [
  [1.0, -1.5395, 0.9056, 1.0 - 1.1187, 0.3129],
  [1.0, -1.8844, 0.9893, 1.0, -1.8991, 0.9892],
];
const ahf_output_gain_coef_50Hz: readonly number[] = [1.3422, 1.4399]; //[SAMPlE_FREQUENCY]

const ahf_numerator_coef_60Hz: readonly number[][] = [
  [0.9528, -1.3891, 0.9528, 0.8272, -0.7225, 0.0264],
  [0.5824, -1.081, 0.5824, 1.0736, -2.0, 1.0736],
];
const ahf_denominator_coef_60Hz: readonly number[][] = [
  [1.0, -1.388, 0.9066, 1.0, -0.9739, 0.2371],
  [1.0, -1.8407, 0.9894, 1.0, -1.8584, 0.9891],
];
const ahf_output_gain_coef_60Hz: readonly number[] = [1.343, 1.4206];

enum FILTER_TYPE {
  LOWPASS,
  HIGHPASS,
}

export {
  NOTCH_FREQUENCY,
  SAMPLE_FREQUENCY,
  lpf_numerator_coef,
  lpf_denominator_coef,
  hpf_numerator_coef,
  hpf_denominator_coef,
  ahf_numerator_coef_50Hz,
  ahf_denominator_coef_50Hz,
  ahf_output_gain_coef_50Hz,
  ahf_numerator_coef_60Hz,
  ahf_denominator_coef_60Hz,
  ahf_output_gain_coef_60Hz,
  FILTER_TYPE,
};
