import { scale, drumScale } from "../constants/scale";
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
          type: "triangle",
          attack: 0,
          decay: 0.5,
          sustain: 0,
          release: 2,
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
          volume: -6,
          oscillator: {
            type: "triangle17",
          },
          attack: 0.01,
          decay: 0.1,
          sustain: 0,
          release: 1.0,
        });
      }
      this.samplers[instrument].toDestination();
    });

    // this.setVolume();
  }

  setVolume(volumePercent) {
    // 볼륨 값을 0부터 100 사이로 정규화
    const volume = Tone.gainToDb(volumePercent / 100);

    // 모든 샘플러의 볼륨 조절
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
