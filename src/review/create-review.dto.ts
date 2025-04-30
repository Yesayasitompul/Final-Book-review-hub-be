import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  bookId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  ulasan: string;
}