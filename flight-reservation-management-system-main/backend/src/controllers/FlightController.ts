import { Request, Response, NextFunction } from 'express';
import { FlightService } from '../services/FlightService';
import { CreateFlightDto, UpdateFlightDto, SearchFlightsDto } from '../validators/FlightValidator';
import { AppError } from '../utils/AppError';

export class FlightController {
  constructor(private flightService: FlightService) {}

  async createFlight(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const flightData: CreateFlightDto = req.body;
      const flight = await this.flightService.createFlight(flightData);
      res.status(201).json({
        status: 'success',
        data: { flight },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateFlight(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const flightData: UpdateFlightDto = req.body;
      const flight = await this.flightService.updateFlight(Number(id), flightData);
      res.status(200).json({
        status: 'success',
        data: { flight },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteFlight(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.flightService.deleteFlight(Number(id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getFlight(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const flight = await this.flightService.getFlightById(Number(id));
      res.status(200).json({
        status: 'success',
        data: { flight },
      });
    } catch (error) {
      next(error);
    }
  }

  async searchFlights(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const searchParams: SearchFlightsDto = req.query as any;
      const flights = await this.flightService.searchFlights(searchParams);
      res.status(200).json({
        status: 'success',
        data: { flights },
      });
    } catch (error) {
      next(error);
    }
  }

  async getUpcomingFlights(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const flights = await this.flightService.getUpcomingFlights();
      res.status(200).json({
        status: 'success',
        data: { flights },
      });
    } catch (error) {
      next(error);
    }
  }

  async getFlightsByStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status } = req.params;
      const flights = await this.flightService.getFlightsByStatus(status);
      res.status(200).json({
        status: 'success',
        data: { flights },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateAvailableSeats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { seats } = req.body;
      const flight = await this.flightService.updateAvailableSeats(Number(id), Number(seats));
      res.status(200).json({
        status: 'success',
        data: { flight },
      });
    } catch (error) {
      next(error);
    }
  }
} 