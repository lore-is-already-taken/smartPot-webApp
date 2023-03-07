declare global {
  namespace Express {
    export interface Request {
      data: {
        temperature: string;
        humidity: string;
        soilMoisture: string;
      };
    }
  }
}
