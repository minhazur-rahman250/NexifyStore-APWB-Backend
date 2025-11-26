// src/supplier/pipes/all-validation.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AllValidationPipe implements PipeTransform {
  transform(body: any) {
   
    if (!body || Object.keys(body).length === 0) {
      return body; 
    }

    
    if (!body.email) {
      throw new BadRequestException('Email is required');
    }
    if (typeof body.email !== 'string' || !body.email.includes('@aiub.edu')) {
      throw new BadRequestException('Email must contain aiub.edu domain');
    }

    
    if (!body.password) {
      throw new BadRequestException('Password is required');
    }
    if (typeof body.password !== 'string') {
      throw new BadRequestException('Password must be a string');
    }
    if (body.password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters long');
    }
    if (!/(?=.*[A-Z])/.test(body.password)) {
      throw new BadRequestException('Password must contain at least one uppercase letter');
    }

    
    if (body.gender) {
      if (!['male', 'female'].includes(body.gender.toLowerCase())) {
        throw new BadRequestException('Gender must be either male or female');
      }
      body.gender = body.gender.toLowerCase();
    }


    if (body.contactNumber && !/^[0-9]+$/.test(body.contactNumber.toString())) {
      throw new BadRequestException('Phone number must contain only numbers');
    }

    return body;
  }
}