const availableNotes = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ]
const major = ['W', 'W', 'H', 'W', 'W', 'W', 'H']
const minor = ['W', 'H', 'W', 'W', 'H', 'W', 'W']

export const shiftNotes = (note) => {
  let notes = [...availableNotes]
  const start = notes.indexOf(note.toUpperCase())
  for (let i = 0; i < start; i++) {
    const shiftedNote = notes.shift()
    notes.push(shiftedNote)
  }
  return notes
}

const mapStepsToScale = steps => note => {
  let notes = shiftNotes(note)
  const scale = [
    notes.shift(), 
    ...steps.map(step => {
      step === 'W' && notes.shift()
      return notes.shift()
    })
  ]
  return [...scale.slice(0, -1), scale[0]]
}

const setOctave = (notes, octave) => notes.map(note => `${note}${octave}`)

class Scale {
  static Major = mapStepsToScale(major)
  static Minor = mapStepsToScale(minor)
  static SetOctave = setOctave
}

export default Scale
