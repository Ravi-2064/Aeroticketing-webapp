import { FlightRepository } from '../repositories/FlightRepository';
import { CreateFlightDto, UpdateFlightDto, SearchFlightsDto } from '../validators/FlightValidator';
import { Flight } from '../entities/Flight.entity';
import { AppError } from '../utils/AppError';

export class FlightService {
  constructor(private flightRepository: FlightRepository) {}

  async createFlight(flightData: CreateFlightDto): Promise<Flight> {
    const existingFlight = await this.flightRepository.findByFlightNumber(flightData.flightNumber);
    if (existingFlight) {
      throw new AppError('Flight number already exists', 400);
    }

    if (flightData.arrivalTime <= flightData.departureTime) {
      throw new AppError('Arrival time must be after departure time', 400);
    }

    if (flightData.availableSeats > flightData.totalSeats) {
      throw new AppError('Available seats cannot be greater than total seats', 400);
    }

    const flight = await this.flightRepository.save(flightData);
    return flight;
  }

  async updateFlight(id: number, flightData: UpdateFlightDto): Promise<Flight> {
    const flight = await this.flightRepository.findOne({ where: { id } });
    if (!flight) {
      throw new AppError('Flight not found', 404);
    }

    if (flightData.flightNumber) {
      const existingFlight = await this.flightRepository.findByFlightNumber(flightData.flightNumber);
      if (existingFlight && existingFlight.id !== id) {
        throw new AppError('Flight number already exists', 400);
      }
    }

    if (flightData.arrivalTime && flightData.departureTime) {
      if (flightData.arrivalTime <= flightData.departureTime) {
        throw new AppError('Arrival time must be after departure time', 400);
      }
    }

    if (flightData.availableSeats && flightData.totalSeats) {
      if (flightData.availableSeats > flightData.totalSeats) {
        throw new AppError('Available seats cannot be greater than total seats', 400);
      }
    }

    const updatedFlight = await this.flightRepository.save({ id, ...flightData });
    return updatedFlight;
  }

  async deleteFlight(id: number): Promise<void> {
    const flight = await this.flightRepository.findOne({ where: { id } });
    if (!flight) {
      throw new AppError('Flight not found', 404);
    }

    await this.flightRepository.delete(id);
  }

  async getFlightById(id: number): Promise<Flight> {
    const flight = await this.flightRepository.findOne({ where: { id } });
    if (!flight) {
      throw new AppError('Flight not found', 404);
    }

    return flight;
  }

  async searchFlights(searchParams: SearchFlightsDto): Promise<Flight[]> {
    return this.flightRepository.searchFlights(searchParams);
  }

  async getUpcomingFlights(): Promise<Flight[]> {
    return this.flightRepository.findUpcomingFlights();
  }

  async updateAvailableSeats(id: number, seats: number): Promise<Flight> {
    const flight = await this.flightRepository.findOne({ where: { id } });
    if (!flight) {
      throw new AppError('Flight not found', 404);
    }

    if (flight.availableSeats + seats < 0) {
      throw new AppError('Not enough available seats', 400);
    }

    if (flight.availableSeats + seats > flight.totalSeats) {
      throw new AppError('Cannot exceed total seats', 400);
    }

    const updatedFlight = await this.flightRepository.updateAvailableSeats(id, seats);
    return updatedFlight;
  }

  async getFlightsByStatus(status: string): Promise<Flight[]> {
    return this.flightRepository.findByStatus(status);
  }
} 