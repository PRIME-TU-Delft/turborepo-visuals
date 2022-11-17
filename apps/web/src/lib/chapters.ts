interface Paragraph {
  name: string;
  url: string;
  state: 'done' | 'todo' | 'in-progress';
}

interface Chapter {
  name: string;
  url: string;
  state: 'done' | 'todo' | 'in-progress';
  paragraphs: Paragraph[];
}

const chapters: Chapter[] = [
  {
    name: 'Lines and Planes',
    url: 'applet/lines_and_planes',
    state: 'in-progress',
    paragraphs: [
      {
        name: 'Two disjoint planes',
        url: 'lines_and_planes/two_disjoint_planes',
        state: 'done'
      },
      {
        name: 'Two plane line intersection',
        url: 'lines_and_planes/two_plane_line_intersection',
        state: 'done'
      },
      {
        name: 'Two planes coincide',
        url: 'lines_and_planes/two_planes_coincide',
        state: 'done'
      }
    ]
  },
  { //Vectors-3Daddition
    name: 'Vectors',
    url: 'applet/vectors',
    state: 'in-progress',
    paragraphs: [
      {
        name: 'Addition of 3D vectors',
        url: 'vectors/3Daddition',
        state: 'in-progress'
      }
    ]
  }

];

// All chapters in the interactive book
export default chapters;

export const getParagraphs = (chapter: string) => {
  return chapters.find((c) => c.name === chapter)?.paragraphs;
};
