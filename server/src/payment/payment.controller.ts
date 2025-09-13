import { Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
 
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('zalopay')
  async createZaloPay() {
    return await this.paymentService.createZaloPayOrder();
  }
}
