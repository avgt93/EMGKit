import { flattenDiagnosticMessageText } from "typescript";
import * as consts from "./constants";

// 2nd order butterworth filter
// cutoff frequency 150hz
function filter_2nd(
  ftype: consts.FILTER_TYPE,
  sampleFreq: number,
  inputValue: number
) {
  var num: number[] = [];
  var den: number[] = [];
  var state: number[] = [0, 0];

  if (ftype == consts.FILTER_TYPE.LOWPASS) {
    // 2nd order butterworth lowpass filter
    if (sampleFreq == consts.SAMPLE_FREQUENCY.FREQ_500HZ) {
      for (var i = 0; i < 3; i++) {
        num[i] = consts.lpf_numerator_coef[0][i];
        den[i] = consts.lpf_denominator_coef[0][i];
      }
    } else if (sampleFreq == consts.SAMPLE_FREQUENCY.FREQ_1000HZ) {
      for (var i = 0; i < 3; i++) {
        num[i] = consts.lpf_numerator_coef[1][i];
        den[i] = consts.lpf_denominator_coef[1][i];
      }
    }
  } else if (ftype == consts.FILTER_TYPE.HIGHPASS) {
    //2nd order butterworth highpass filter
    if (sampleFreq == consts.SAMPLE_FREQUENCY.FREQ_500HZ) {
      for (var i = 0; i < 3; i++) {
        num[i] = consts.hpf_numerator_coef[0][i];
        den[i] = consts.hpf_denominator_coef[0][i];
      }
    } else if (sampleFreq == consts.SAMPLE_FREQUENCY.FREQ_1000HZ) {
      for (var i = 0; i < 3; i++) {
        num[i] = consts.hpf_numerator_coef[1][i];
        den[i] = consts.hpf_denominator_coef[1][i];
      }
    }
  }

  const temp = (inputValue - den[1] * state[0] - den[2] * state[1]) / den[0];

  const output = num[0] * temp + num[1] * state[0] + num[2] * state[1];

  state[1] = state[0];

  state[0] = temp;

  return output;
}

//fourth order filter for humming noise
function filter_4th(sampleFreq: number, humFreq: number, inputValue: number) {
  var state: number[] = [];
  var num: number[] = [];
  var den: number[] = [];
  var gain;

  gain = 0;
  for (var i = 0; i < 4; i++) {
    state[i] = 0;
  }

  if (humFreq == consts.NOTCH_FREQUENCY.FREQ_50HZ) {
    if (sampleFreq == consts.SAMPLE_FREQUENCY.FREQ_500HZ) {
      for (var i = 0; i < 6; i++) {
        num[i] = consts.ahf_numerator_coef_50Hz[0][i];
        den[i] = consts.ahf_denominator_coef_50Hz[0][i];
      }
      gain = consts.ahf_output_gain_coef_50Hz[0];
    } else if (sampleFreq == consts.SAMPLE_FREQUENCY.FREQ_1000HZ) {
      for (var i = 0; i < 6; i++) {
        num[i] = consts.ahf_numerator_coef_50Hz[1][i];
        den[i] = consts.ahf_denominator_coef_50Hz[1][i];
      }
      gain = consts.ahf_output_gain_coef_50Hz[1];
    }
  } else if (humFreq == consts.NOTCH_FREQUENCY.FREQ_60HZ) {
    if (sampleFreq == consts.SAMPLE_FREQUENCY.FREQ_500HZ) {
      for (var i = 0; i < 6; i++) {
        num[i] = consts.ahf_numerator_coef_60Hz[0][i];
        den[i] = consts.ahf_denominator_coef_60Hz[0][i];
      }
      gain = consts.ahf_output_gain_coef_60Hz[0];
    } else if (sampleFreq == consts.SAMPLE_FREQUENCY.FREQ_1000HZ) {
      for (var i = 0; i < 6; i++) {
        num[i] = consts.ahf_numerator_coef_60Hz[1][i];
        den[i] = consts.ahf_denominator_coef_60Hz[1][i];
      }
      gain = consts.ahf_output_gain_coef_60Hz[1];
    }

    var stageOut = num[0] * inputValue + state[0];
    state[0] = num[1] * inputValue + state[1] - den[1] * stageOut;
    state[1] = num[2] * inputValue - den[2] * stageOut;

    var stageIn = stageOut;
    stageOut = num[3] * stageOut + state[2];
    state[2] = num[4] * stageIn + state[3] - den[4] * stageOut;
    state[3] = num[5] * stageIn - den[5] * stageOut;

    var output = gain * stageOut;

    return output;
  }
}

function EMGFilter(
  sampleFreq: consts.SAMPLE_FREQUENCY,
  notchFreq: consts.NOTCH_FREQUENCY,
  enableNotchFilter: boolean,
  enableHighPassFilter: boolean,
  enableLowPassFilter: boolean,
  inputValue: number
) {
  var bypassEnabled: boolean = true;

  if (
    (sampleFreq == consts.SAMPLE_FREQUENCY.FREQ_500HZ ||
      sampleFreq == consts.SAMPLE_FREQUENCY.FREQ_1000HZ) &&
    (notchFreq == consts.NOTCH_FREQUENCY.FREQ_50HZ ||
      notchFreq == consts.NOTCH_FREQUENCY.FREQ_60HZ)
  ) {
    bypassEnabled = false;
  }

  var output = 0;
  if (bypassEnabled) {
    return (output = inputValue);
  }

  if (enableNotchFilter) {
    output = filter_4th(sampleFreq, notchFreq, inputValue);
  } else {
    output = inputValue;
  }

  if (enableLowPassFilter) {
    output = filter_2nd(consts.FILTER_TYPE.LOWPASS, sampleFreq, inputValue);
  }

  if (enableHighPassFilter) {
    output = filter_2nd(consts.FILTER_TYPE.HIGHPASS, sampleFreq, inputValue);
  }

  return output;
}

export { EMGFilter };
