import { scale } from "../constants/scale";
import * as Tone from "tone";

const getTransport = () => {
  return Tone.Transport;
};

const drumSamples = {
  36: "/audio/drum/36.mp3",
  38: "/audio/drum/38.mp3",
};

class Synth {
  constructor(
    callback,
    instruments = ["piano", "guitar", "drum"],
    samples = "audio/"
  ) {
    this.instruments = instruments;
    this.activeInstrument = this.instruments[0];
    this.samplers = {};


    this.instruments.forEach((instrument) => {
      if (instrument !== "drum") {
        this.samplers[instrument] = new Tone.Sampler(
          scale,
          callback,
          // samples + instrument + "/"
          "/audio/" + instrument + "/"
        );
      } else {
        this.samplers[instrument] = new Tone.Sampler(drumSamples);
      }
      this.samplers[instrument].toDestination();
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

  stop() {
    const transport = getTransport();
    transport.stop();
  }

  repeat(callback, timing = "8n") {
    this.timing = timing;
    const transport = getTransport();

    // Clear any previously scheduled events
    transport.cancel(0);

    // Schedule the new repeating events
    transport.scheduleRepeat((time) => {
      callback(time, this.activeInstrument);
    }, timing);
  }

  playNote(note, time, timing = "8n", Instrument = this.activeInstrument) {
    const activeSampler = this.samplers[Instrument];
    activeSampler.triggerAttackRelease(note, timing, time);
  }

  setBPM(bpm = 120) {
    getTransport().bpm.value = bpm;
  }

  setInstrument(instrument) {
    this.activeInstrument = instrument;
  }
}

export default Synth;