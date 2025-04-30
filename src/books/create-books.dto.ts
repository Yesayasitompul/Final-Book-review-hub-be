import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBooksDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  author: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  imageUrl: string;
}