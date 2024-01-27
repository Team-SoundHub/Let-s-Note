import Scale, { shiftNotes } from './Scale'

describe('Scale static class tests', () => {
  it('should print the C Major scale', () => {
    expect(Scale.Major('c')).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'])
  })

  it('should create the D Major scale', () => {
    expect(Scale.Major('d')).toEqual(['D', 'E', 'F#', 'G', 'A', 'B', 'C#', 'D'])
  })

  it('should create the G Major scale', () => {
    expect(Scale.Major('g')).toEqual(['G', 'A', 'B', 'C', 'D', 'E', 'F#', 'G'])
  })

  it('should create the D Minor scale', () => {
    expect(Scale.Minor('d')).toEqual(['D', 'E', 'F', 'G', 'A', 'A#', 'C', 'D'])
  })

  it('should create the G# Minor scale', () => {
    expect(Scale.Minor('g#')).toEqual([
      'G#',
      'A#',
      'B',
      'C#',
      'D#',
      'E',
      'F#',
      'G#'
    ])
  })

  it('should create D# Minor scale in the 3rd octave', () => {
    expect(Scale.SetOctave(Scale.Minor('d#'), 3)).toEqual([
      'D#3',
      'F3',
      'F#3',
      'G#3',
      'A#3',
      'B3',
      'C#3',
      'D#3'
    ])
  })
})

describe('Shift notes array tests', () => {
  it('should shift notes to F#', () => {
    const shiftedNotes = [
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B',
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F'
    ]
    expect(shiftNotes('F#')).toEqual(shiftedNotes)
  })

  it('shift notes to C', () => {
    const shiftedNotes = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B'
    ]
    expect(shiftNotes('C')).toEqual(shiftedNotes)
  })
})
