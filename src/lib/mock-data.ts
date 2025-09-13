export const mockNewsData: string[] = [
  "A major fire has broken out at a key API manufacturing plant in Hyderabad, India, a hub for many global pharmaceutical companies. Production is expected to be halted for at least three months, affecting the global supply of several generic drugs.",
  "The FDA has issued a warning letter to a large sterile injectable facility in Puerto Rico due to significant violations of current Good Manufacturing Practice (cGMP) regulations. This could lead to a recall and shortage of critical hospital-administered drugs.",
  "Typhoon Koinu is making landfall in Taiwan, home to several major biotech and pharmaceutical packaging suppliers. Widespread power outages and flooding are reported, threatening cold chain integrity for temperature-sensitive biologics.",
  "A new export ban on certain medical raw materials has been announced by the Chinese government, aiming to secure domestic supply. This will immediately impact U.S. and European drug manufacturers who rely heavily on these components.",
  "Workers at a major logistics and shipping port in Rotterdam have announced a two-week strike over pay disputes. The port is a critical entry point for pharmaceuticals into the European Union, and delays are expected to cause significant disruption.",
  "A cybersecurity breach at a leading global contract development and manufacturing organization (CDMO) has compromised sensitive formulation data. Regulatory bodies are investigating the extent of the breach and its impact on intellectual property and production schedules.",
  "An unexpected volcanic eruption in Iceland is causing major air travel disruptions across the North Atlantic. Shipments of time-sensitive radiopharmaceuticals and clinical trial materials are facing critical delays, jeopardizing patient treatments and research timelines."
];

export const knownPharmaSuppliers: string[] = [
  "Pfizer",
  "Lonza Group",
  "Catalent",
  "Thermo Fisher Scientific",
  "Merck KGaA",
  "Roche",
  "Novartis",
  "Sanofi",
  "Johnson & Johnson",
  "Gilead Sciences"
];

export const locationCoordinates: Record<string, { lat: number; lng: number }> = {
  "Hyderabad, India": { lat: 17.3850, lng: 78.4867 },
  "Puerto Rico": { lat: 18.2208, lng: -66.5901 },
  "Taiwan": { lat: 23.6978, lng: 120.9605 },
  "China": { lat: 35.8617, lng: 104.1954 },
  "Rotterdam": { lat: 51.9244, lng: 4.4777 },
  "Global": { lat: 20, lng: 0 }, // Generic coordinate for non-specific locations
  "North Atlantic": { lat: 55.0, lng: -35.0 },
  "Iceland": { lat: 64.9631, lng: -19.0208 }
};
