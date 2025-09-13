import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import moment from 'moment';

@Injectable()
export class PaymentService {
  private config = {
    app_id: '2553',
    key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
  };

  async createZaloPayOrder() {
    const embed_data = {};
    const items = [{}];

    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: this.config.app_id,
      app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
      app_user: 'user123',
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: 50000,
      description: `Lazada - Payment for the order #${transID}`,
      bank_code: 'zalopayapp',
    };

    const data =
      this.config.app_id +
      '|' +
      order.app_trans_id +
      '|' +
      order.app_user +
      '|' +
      order.amount +
      '|' +
      order.app_time +
      '|' +
      order.embed_data +
      '|' +
      order.item;

    // @ts-ignore
    order['mac'] = CryptoJS.HmacSHA256(data, this.config.key1).toString();

    try {
        const embed_data = {
         redirect_url: 'https://google.com',   
        }
      const response = await axios.post(this.config.endpoint, null, {
        params: order,
      });

      return response.data;
    } catch (error) {
        // @ts-ignore
      console.error('ZaloPay Error:', error?.response?.data || error);
      throw new Error('Failed to create ZaloPay payment');
    }
  }
}
