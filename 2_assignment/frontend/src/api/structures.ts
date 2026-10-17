
export type Plane = {
  id: number;
  registration: string;
  type: string;
  capacity: number;
  cargoSpaceCapacity: number;
};

export type Employee = {
  id: number;
  name: string;
  telephone: string;
  email: string;
  role: string;
};

export type Line = {
  id: number;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  distance: number;
};