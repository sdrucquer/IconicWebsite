export type ServiceAreaTown = {
  name: string;
  county: string;
  lat: number;
  lng: number;
  blurb: string;
  aliases?: string[];
};

export const mapBounds: [[number, number], [number, number]] = [
  [-75.95, 39.98],
  [-75.3, 40.48]
];

export const serviceAreaPolygon = [
  [-75.82, 40.34],
  [-75.36, 40.34],
  [-75.36, 40.2],
  [-75.43, 40.06],
  [-75.67, 40.05],
  [-75.84, 40.12],
  [-75.86, 40.26],
  [-75.82, 40.34]
];

export const primaryServiceTowns: ServiceAreaTown[] = [
  {
    name: "Pottstown",
    county: "Montgomery County",
    lat: 40.2454,
    lng: -75.6499,
    blurb: "One of the towns we work most. Mulching jobs, bed cleanups, full property resets."
  },
  {
    name: "Royersford",
    county: "Montgomery County",
    lat: 40.1842,
    lng: -75.5391,
    blurb: "Regular customers across the borough, with a wide range of property sizes."
  },
  {
    name: "Collegeville",
    county: "Montgomery County",
    lat: 40.1862,
    lng: -75.453,
    blurb: "Steady work in Collegeville, mostly mid-size residential properties."
  },
  {
    name: "Gilbertsville",
    county: "Montgomery County",
    lat: 40.3201,
    lng: -75.6102,
    blurb: "Quiet, established neighborhoods. Great clients, great trees, lots of leaves."
  },
  {
    name: "Pottsgrove",
    county: "Montgomery County",
    lat: 40.2542,
    lng: -75.6033,
    blurb: "Right next door to Pottstown. We're here often."
  },
  {
    name: "Phoenixville",
    county: "Chester County",
    lat: 40.1304,
    lng: -75.5147,
    blurb: "One of our most active areas. Spring cleanups dominate the schedule here."
  },
  {
    name: "Spring City",
    county: "Chester County",
    lat: 40.1762,
    lng: -75.5499,
    blurb: "Right across the river from Royersford. Same crews, same week."
  },
  {
    name: "Chester Springs",
    county: "Chester County",
    lat: 40.1051,
    lng: -75.6388,
    blurb: "Bigger properties, more land. We handle the full list out here."
  },
  {
    name: "St. Peters",
    county: "Chester County",
    lat: 40.1809,
    lng: -75.7325,
    blurb: "Beautiful pocket of the region. Wooded properties, plenty of debris work."
  },
  {
    name: "Birchrunville",
    county: "Chester County",
    lat: 40.1395,
    lng: -75.6779,
    blurb: "Small village, large lots. Detail work is the name of the game here."
  },
  {
    name: "East Nantmeal",
    county: "Chester County",
    lat: 40.169,
    lng: -75.728,
    blurb: "Rural Chester County. We travel for the right job, and this counts."
  },
  {
    name: "Douglassville",
    county: "Berks County",
    lat: 40.2578,
    lng: -75.7263,
    blurb: "Our Berks County regular. Active customer base, expanding every season."
  }
];

export const extendedServiceTowns: ServiceAreaTown[] = [
  { name: "Bucktown", county: "Chester County", lat: 40.202, lng: -75.676, blurb: "Not on our primary list, but close enough that we work here regularly." },
  { name: "Pughtown", county: "Chester County", lat: 40.1706, lng: -75.6747, blurb: "A nearby pocket we can usually cover for cleanup and bed work." },
  { name: "Glenmoore", county: "Chester County", lat: 40.0876, lng: -75.7719, blurb: "We have customer proof here and prioritize solid residential scopes." },
  { name: "Birdsboro", county: "Berks County", lat: 40.2645, lng: -75.8041, blurb: "A larger-job Berks County area we know and have served before." },
  { name: "Limerick", county: "Montgomery County", lat: 40.2309, lng: -75.5221, blurb: "Between Royersford and Pottstown, so it is a natural fit for our crews." },
  { name: "Boyertown", county: "Berks County", lat: 40.3337, lng: -75.6374, blurb: "North of Gilbertsville and often in range for the right scope." },
  { name: "Sanatoga", county: "Montgomery County", lat: 40.2457, lng: -75.5952, blurb: "Pottstown-adjacent and firmly in our regular service orbit." },
  { name: "Stowe", county: "Montgomery County", lat: 40.2526, lng: -75.6772, blurb: "Right by Pottstown, and a practical fit for most services." },
  { name: "Linfield", county: "Montgomery County", lat: 40.2093, lng: -75.5719, blurb: "Between Limerick and Royersford, with easy route coverage." },
  { name: "Trappe", county: "Montgomery County", lat: 40.1987, lng: -75.4763, blurb: "Collegeville-adjacent and in range for seasonal work." },
  { name: "Schwenksville", county: "Montgomery County", lat: 40.2565, lng: -75.4638, blurb: "A wider-net Montgomery County town we can often cover." },
  { name: "Eagleville", county: "Montgomery County", lat: 40.1596, lng: -75.4082, blurb: "East of Collegeville, usually best for larger or well-scoped jobs." },
  { name: "Kimberton", county: "Chester County", lat: 40.129, lng: -75.5702, blurb: "Between Phoenixville and Chester Springs, with good route fit." },
  { name: "Mont Clare", county: "Montgomery County", lat: 40.1368, lng: -75.5008, blurb: "Across the river from Phoenixville and often easy for our crews." },
  { name: "Parker Ford", county: "Chester County", lat: 40.1984, lng: -75.588, blurb: "Royersford and Spring City borderlands, which we know well." },
  { name: "Elverson", county: "Chester County", lat: 40.1568, lng: -75.8327, blurb: "Farther west, but often viable for larger property scopes." },
  { name: "Honey Brook", county: "Chester County", lat: 40.0943, lng: -75.9111, blurb: "Western Chester County, best for larger jobs and capacity-dependent scheduling." },
  { name: "Eagle", county: "Chester County", lat: 40.0798, lng: -75.6883, blurb: "Chester Springs-adjacent and a strong fit for the right scope." },
  { name: "Lyndell", county: "Chester County", lat: 40.0659, lng: -75.7547, blurb: "A small Chester County area we can usually evaluate quickly by address." },
  { name: "Marsh Creek", county: "Chester County", lat: 40.066, lng: -75.727, blurb: "Near our Chester Springs work, especially for larger residential properties.", aliases: ["Marsh Creek Area"] },
  { name: "Lionville", county: "Chester County", lat: 40.0537, lng: -75.6513, blurb: "East of Chester Springs and often sensible for larger or bundled work." },
  { name: "Exton", county: "Chester County", lat: 40.029, lng: -75.6275, blurb: "A wider Chester County area where larger scopes are most likely to fit." },
  { name: "Reading", county: "Berks County", lat: 40.3356, lng: -75.9269, blurb: "Farther out, but included in our wide-net search for larger jobs." },
  { name: "Fleetwood", county: "Berks County", lat: 40.4537, lng: -75.8174, blurb: "A far Berks County match where we would confirm scope before committing." },
  { name: "Oley", county: "Berks County", lat: 40.3876, lng: -75.7896, blurb: "A wider Berks County town we can evaluate by address and scope." },
  { name: "Exeter", county: "Berks County", lat: 40.3057, lng: -75.8488, blurb: "Near Birdsboro and Reading, usually a larger-job conversation.", aliases: ["Exeter Township"] },
  { name: "Geigertown", county: "Berks County", lat: 40.2037, lng: -75.8363, blurb: "Close to Birdsboro and often worth checking with an address." },
  { name: "Schuylkill Township", county: "Chester County", lat: 40.116, lng: -75.541, blurb: "Phoenixville-area township coverage we can usually evaluate quickly." },
  { name: "North Coventry", county: "Chester County", lat: 40.214, lng: -75.638, blurb: "Right by Pottstown and a natural fit for most services.", aliases: ["North Coventry Township"] },
  { name: "South Coventry", county: "Chester County", lat: 40.171, lng: -75.656, blurb: "A nearby township we can usually cover depending on schedule.", aliases: ["South Coventry Township"] },
  { name: "Coventryville", county: "Chester County", lat: 40.1757, lng: -75.6724, blurb: "Close to our Chester County route and usually worth a quote conversation." },
  { name: "East Vincent", county: "Chester County", lat: 40.172, lng: -75.595, blurb: "Spring City-adjacent and a practical fit for many services.", aliases: ["East Vincent Township"] },
  { name: "West Vincent", county: "Chester County", lat: 40.105, lng: -75.665, blurb: "Chester Springs-area township coverage, especially for larger properties.", aliases: ["West Vincent Township"] },
  { name: "East Pikeland", county: "Chester County", lat: 40.13, lng: -75.56, blurb: "Phoenixville and Kimberton-adjacent, often a good route fit.", aliases: ["East Pikeland Township"] },
  { name: "West Pikeland", county: "Chester County", lat: 40.075, lng: -75.62, blurb: "Near Chester Springs and often sensible for larger residential scopes.", aliases: ["West Pikeland Township"] },
  { name: "East Coventry", county: "Chester County", lat: 40.206, lng: -75.607, blurb: "Close to Pottstown and Spring City, with frequent route overlap.", aliases: ["East Coventry Township"] },
  { name: "West Coventry", county: "Chester County", lat: 40.195, lng: -75.69, blurb: "Western OJR-area coverage we can usually check quickly.", aliases: ["West Coventry Township"] },
  { name: "Skippack", county: "Montgomery County", lat: 40.2229, lng: -75.3988, blurb: "East of Collegeville, best for larger scopes or flexible scheduling." },
  { name: "Perkiomenville", county: "Montgomery County", lat: 40.3207, lng: -75.4769, blurb: "North Montgomery County, usually a scope-and-schedule check." },
  { name: "Green Lane", county: "Montgomery County", lat: 40.3387, lng: -75.4696, blurb: "Farther north, but included in the wide-net service check." },
  { name: "Marlborough", county: "Montgomery County", lat: 40.348, lng: -75.435, blurb: "A far Montgomery County area where scope matters.", aliases: ["Marlborough Township"] },
  { name: "New Hanover", county: "Montgomery County", lat: 40.316, lng: -75.578, blurb: "Gilbertsville-area township coverage and often a practical fit.", aliases: ["New Hanover Township"] },
  { name: "Douglass Township", county: "Montgomery County", lat: 40.316, lng: -75.62, blurb: "Near Gilbertsville and Boyertown, usually worth a quote conversation.", aliases: ["Douglass"] }
];

export const groupedPrimaryTowns = [
  {
    county: "Montgomery County",
    towns: primaryServiceTowns.filter((town) => town.county === "Montgomery County")
  },
  {
    county: "Chester County",
    towns: primaryServiceTowns.filter((town) => town.county === "Chester County")
  },
  {
    county: "Berks County",
    towns: primaryServiceTowns.filter((town) => town.county === "Berks County")
  }
];
