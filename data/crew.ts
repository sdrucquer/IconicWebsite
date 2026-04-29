// ---------------------------------------------------------------------------
// Crew members who hand out flyers with QR codes.
// To add a new crew member: append one line to this array.
// The slug must match the ?ref= value in their QR code URL.
// ---------------------------------------------------------------------------
export type CrewMember = {
  slug: string;
  name: string;
};

export const CREW: CrewMember[] = [
  { slug: "danb",     name: "Dan B."      },
  { slug: "ryand",    name: "Ryan D."     },
  { slug: "jaydenh",  name: "Jayden H."   },
  { slug: "anthonyg", name: "Anthony G."  },
  { slug: "carsonm",  name: "Carson M."   },
  { slug: "mattj",    name: "Matt J."     },
  { slug: "shanind",  name: "Shanin D."   },
];
