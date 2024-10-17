// update-book-availability.dto.ts
import { IsBoolean } from 'class-validator';

export class UpdateBookAvailabilityDto {
    @IsBoolean()
    isAvailable: boolean;
}
