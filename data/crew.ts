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
  { slug: "anthonym",  name: "Anthony Mackrides"  },
  { slug: "carsonm",   name: "Carson Moscariello" },
  { slug: "gavinc",    name: "Gavin Cinkowski"    },
  { slug: "jaydenh",   name: "Jayden Herman"      },
  { slug: "carterh",   name: "Carter Hritz"       },
  { slug: "anthonyg",  name: "Anthony Grover"     },
  { slug: "logang",    name: "Logan Gasser"       },
  { slug: "ryanh",     name: "Ryan Hatt"          },
  { slug: "marcusr",   name: "Marcus Rossman"     },
  { slug: "gabes",     name: "Gabe Sheaffer"      },
  { slug: "gyasi",     name: "Gyasi"              },
  { slug: "ashtonc",   name: "Ashton Confino"     },
  { slug: "jaxtonm",   name: "Jaxton Majcher"     },
  { slug: "ryand",     name: "Ryan D’Angelo"      },
  { slug: "mattj",     name: "Matt J."            },
  { slug: "danb",      name: "Dan Bower"          },
  { slug: "shanind",   name: "Shanin Drucquer"    },
];
