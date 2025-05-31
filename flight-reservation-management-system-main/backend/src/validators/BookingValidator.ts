import { IsNumber, IsString, IsDate, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export class CreateBookingDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  flightId: number;

  @IsDate()
  @Type(() => Date)
  bookingDate: Date;

  @IsString()
  seatNumber: string;

  @IsEnum(BookingStatus)
  @IsOptional()
  status?: BookingStatus;

  @IsNumber()
  totalPrice: number;
}

export class UpdateBookingDto {
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  bookingDate?: Date;

  @IsString()
  @IsOptional()
  seatNumber?: string;

  @IsEnum(BookingStatus)
  @IsOptional()
  status?: BookingStatus;

  @IsNumber()
  @IsOptional()
  totalPrice?: number;
}

export class BookingSearchDto {
  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsNumber()
  @IsOptional()
  flightId?: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @IsEnum(BookingStatus)
  @IsOptional()
  status?: BookingStatus;
} 