import { IsString, IsNumber, Min, IsDate, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export enum FlightStatus {
  SCHEDULED = 'scheduled',
  DELAYED = 'delayed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export class CreateFlightDto {
  @IsString()
  flightNumber: string;

  @IsString()
  departureCity: string;

  @IsString()
  arrivalCity: string;

  @IsString()
  departureAirport: string;

  @IsString()
  arrivalAirport: string;

  @IsDate()
  @Type(() => Date)
  departureTime: Date;

  @IsDate()
  @Type(() => Date)
  arrivalTime: Date;

  @IsNumber()
  @Min(1)
  totalSeats: number;

  @IsNumber()
  @Min(0)
  availableSeats: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsEnum(FlightStatus)
  @IsOptional()
  status?: FlightStatus;
}

export class UpdateFlightDto {
  @IsString()
  @IsOptional()
  flightNumber?: string;

  @IsString()
  @IsOptional()
  departureCity?: string;

  @IsString()
  @IsOptional()
  arrivalCity?: string;

  @IsString()
  @IsOptional()
  departureAirport?: string;

  @IsString()
  @IsOptional()
  arrivalAirport?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  departureTime?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  arrivalTime?: Date;

  @IsNumber()
  @Min(1)
  @IsOptional()
  totalSeats?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  availableSeats?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsEnum(FlightStatus)
  @IsOptional()
  status?: FlightStatus;
}

export class SearchFlightsDto {
  @IsString()
  @IsOptional()
  departureCity?: string;

  @IsString()
  @IsOptional()
  arrivalCity?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  departureDate?: Date;

  @IsNumber()
  @Min(1)
  @IsOptional()
  passengers?: number;
} 