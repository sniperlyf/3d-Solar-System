export interface Planet {
  id: string
  name: string
  type: string
  description: string
  distanceFromSun: number
  orbitalPeriod: number
  diameter: number
  moons: number
  temperature: string
  color: string
  size: number
  funFacts?: string[]
}

export const planets: Planet[] = [
  {
    id: "mercury",
    name: "Mercury",
    type: "Terrestrial Planet",
    description:
      "Mercury is the smallest and innermost planet in the Solar System. It has no natural satellites and is one of four terrestrial planets in our solar system.",
    distanceFromSun: 57.9,
    orbitalPeriod: 88,
    diameter: 4879,
    moons: 0,
    temperature: "-173°C to 427°C",
    color: "#A9A9A9",
    size: 0.4,
    funFacts: [
      "Mercury has a very thin atmosphere, which is why it experiences such extreme temperature variations.",
      "A day on Mercury (sunrise to sunrise) lasts 176 Earth days.",
      "Mercury is the second densest planet after Earth.",
    ],
  },
  {
    id: "venus",
    name: "Venus",
    type: "Terrestrial Planet",
    description:
      "Venus is the second planet from the Sun and is often called Earth's sister planet due to their similar size and mass. It has the densest atmosphere of all terrestrial planets.",
    distanceFromSun: 108.2,
    orbitalPeriod: 225,
    diameter: 12104,
    moons: 0,
    temperature: "462°C (average)",
    color: "#E6E6FA",
    size: 0.9,
    funFacts: [
      "Venus rotates in the opposite direction to most planets.",
      "A day on Venus is longer than its year.",
      "Venus has the hottest surface of any planet in our solar system due to its runaway greenhouse effect.",
    ],
  },
  {
    id: "earth",
    name: "Earth",
    type: "Terrestrial Planet",
    description:
      "Earth is the third planet from the Sun and the only astronomical object known to harbor life. It is the densest planet in the Solar System and the largest of the four terrestrial planets.",
    distanceFromSun: 149.6,
    orbitalPeriod: 365.25,
    diameter: 12742,
    moons: 1,
    temperature: "-88°C to 58°C",
    color: "#1E90FF",
    size: 1,
    funFacts: [
      "Earth is the only planet not named after a god.",
      "Earth's atmosphere is composed of 78% nitrogen, 21% oxygen, and 1% other gases.",
      "Earth is the only planet known to have liquid water on its surface.",
    ],
  },
  {
    id: "mars",
    name: "Mars",
    type: "Terrestrial Planet",
    description:
      'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. It is often referred to as the "Red Planet" due to its reddish appearance.',
    distanceFromSun: 227.9,
    orbitalPeriod: 687,
    diameter: 6779,
    moons: 2,
    temperature: "-153°C to 20°C",
    color: "#CD5C5C",
    size: 0.5,
    funFacts: [
      "Mars has the largest dust storms in the solar system, which can last for months and cover the entire planet.",
      "Mars has the tallest mountain in the solar system, Olympus Mons, which is three times taller than Mount Everest.",
      "The two moons of Mars, Phobos and Deimos, are thought to be captured asteroids.",
    ],
  },
  {
    id: "jupiter",
    name: "Jupiter",
    type: "Gas Giant",
    description:
      "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets combined.",
    distanceFromSun: 778.5,
    orbitalPeriod: 4333,
    diameter: 139820,
    moons: 79,
    temperature: "-145°C (cloud top)",
    color: "#F5DEB3",
    size: 2.5,
    funFacts: [
      "Jupiter has the shortest day of all the planets, rotating once every 9.8 hours.",
      "The Great Red Spot on Jupiter is a giant storm that has been raging for at least 400 years.",
      "Jupiter has the strongest magnetic field of any planet in our solar system.",
    ],
  },
  {
    id: "saturn",
    name: "Saturn",
    type: "Gas Giant",
    description:
      "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine times that of Earth. It has only one-eighth the average density of Earth.",
    distanceFromSun: 1434,
    orbitalPeriod: 10759,
    diameter: 116460,
    moons: 82,
    temperature: "-178°C (cloud top)",
    color: "#F0E68C",
    size: 2.2,
    funFacts: [
      "Saturn's rings are made mostly of ice particles, with a smaller amount of rocky debris and dust.",
      "Saturn has the most extensive ring system of any planet in our solar system.",
      "Saturn is the least dense planet in our solar system and would float in water if there were an ocean large enough to hold it.",
    ],
  },
  {
    id: "uranus",
    name: "Uranus",
    type: "Ice Giant",
    description:
      "Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. It is similar in composition to Neptune, and both have bulk chemical compositions which differ from that of the larger gas giants Jupiter and Saturn.",
    distanceFromSun: 2871,
    orbitalPeriod: 30687,
    diameter: 50724,
    moons: 27,
    temperature: "-224°C (cloud top)",
    color: "#ADD8E6",
    size: 1.8,
    funFacts: [
      "Uranus rotates on its side, with an axial tilt of 98 degrees.",
      "Uranus was the first planet discovered with a telescope.",
      "Uranus is the coldest planet in our solar system, despite not being the farthest from the Sun.",
    ],
  },
  {
    id: "neptune",
    name: "Neptune",
    type: "Ice Giant",
    description:
      "Neptune is the eighth and farthest known planet from the Sun in the Solar System. It is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. Neptune is 17 times the mass of Earth.",
    distanceFromSun: 4495,
    orbitalPeriod: 60190,
    diameter: 49244,
    moons: 14,
    temperature: "-218°C (cloud top)",
    color: "#4169E1",
    size: 1.7,
    funFacts: [
      "Neptune was the first planet to be predicted mathematically before it was actually observed.",
      "Neptune has the strongest winds in the solar system, reaching speeds of 2,100 km/h.",
      "Neptune completes one orbit of the Sun every 165 Earth years.",
    ],
  },
]

