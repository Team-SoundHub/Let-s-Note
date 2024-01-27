import { scale } from "../constants/scale";
import * as Tone from "tone";

const getTransport = () => {
  return Tone.Transport;
};

class Synth {
  constructor(callback, instruments = ["piano"], samples = "audio/") {
    this.instruments = instruments;
    this.activeInstrument = this.instruments[0];
    this.samplers = {};

    this.instruments.forEach((instrument) => {
      this.samplers[instrument] = new Tone.Sampler(
        scale,
        callback,
        samples + instrument + "/"
      );
      this.samplers[instrument].toMaster();
    });

    this.setVolume();
  }

  setVolume(volume = -12) {
    Object.values(this.samplers).forEach((sampler) => {
      sampler.volume.value = volume;
    });

  }

  toggle() {
    if (Tone.context.state !== "running") {
      Tone.context.resume();
    }
    getTransport().toggle();
  }

  repeat(callback, timing = "8n") {
    this.timing = timing;
    getTransport().scheduleRepeat(callback, timing);
  }

  playNote(note, time, timing = "8n") {
    this.samplers[this.activeInstrument].triggerAttackRelease(
      note,
      this.timing || timing,
      time
    );

  }

  setBPM(bpm = 120) {
    getTransport().bpm.value = bpm;
  }

  setInstrument(instrument) {
    this.activeInstrument = instrument;
  }

}

export default Synth;
