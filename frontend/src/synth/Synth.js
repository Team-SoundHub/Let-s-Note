import { scale } from "../constants/scale";
import * as Tone from "tone";

const getTransport = () => {
  return Tone.Transport;
};

class Synth {
  constructor(callback, samples = "audio/marimba/") {
    this.sampler = new Tone.Sampler(scale, callback, samples);
    this.sampler.toMaster();
    this.setVolume();
  }

  setVolume(volume = -12) {
    this.sampler.volume.value = volume;
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
    this.sampler.triggerAttackRelease(note, this.timing || timing, time);
  }

  setBPM(bpm = 120) {
    getTransport().bpm.value = bpm;
  }
}

export default Synth;
