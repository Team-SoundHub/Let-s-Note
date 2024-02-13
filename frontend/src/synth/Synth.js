import { scale, pianoScale, drumScale } from "../constants/scale";
import * as Tone from "tone";

const getTransport = () => {
  return Tone.Transport;
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
    const reverb = new Tone.Reverb({
      decay: 5, // 리버브의 감쇠 시간
      wet: 0.5, // 리버브의 믹스 레벨
    }).toDestination();

    this.instruments.forEach((instrument) => {
      if (instrument === "guitar") {
        this.samplers[instrument] = new Tone.Sampler(
          scale,
          callback,
          "/audio/" + instrument + "/"
        ).set({
          volume: -12,
          type: "square", // 사각파
          attack: 0,
          decay: 0.8,
          sustain: 0,
          release: 1.7,
        });
        this.samplers[instrument].connect(reverb);
      } else if (instrument === "piano") {
        this.samplers[instrument] = new Tone.Sampler(
          scale,
          callback,
          "/audio/" + instrument + "/"
        ).set({
          volume: -12,
          type: "square", // 사각파
          attack: 0,
          decay: 0.8,
          sustain: 0,
          release: 1.7,
        });
        this.samplers[instrument].connect(reverb);
      } else {
        this.samplers[instrument] = new Tone.Sampler(
          drumScale,
          callback,
          "/audio/" + instrument + "/"
        ).set({
          volume: -4,
          oscillator: {
            type: "triangle17",
          },
          attack: 0.01,
          decay: 0.1,
          sustain: 0.2,
          release: 1.0,
        });
      }
      this.samplers[instrument].toDestination();
    });

    // this.setVolume();
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
