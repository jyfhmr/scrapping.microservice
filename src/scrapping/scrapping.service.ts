import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
@Injectable()
export class ScrappingService {

  private readonly url = 'https://www.bcv.org.ve/';

  async create() {
    console.log("ejecutando cron")
    var resultMessage = {
      "usd": 0,
      "error": 0
    };

    try {

      const response = await axios.get(this.url, { timeout: 30000 });
      const $ = cheerio.load(response.data);
      const usdHtml = $('#dolar').html();

      if ((!usdHtml)) { throw new HttpException("La tasa no pudo ser obtenida, posiblemente hubo un cambio en el sitio del BCV, contactar al desarrollador (0)", 500) }
      resultMessage.usd = this.getChange(usdHtml)

      console.log(resultMessage)

    } catch (error) {

      resultMessage.error = 1
      console.log("error", error)

    } finally {

      console.log("El result message que se va a enviar", resultMessage)

      /*
      axios.post(`${process.env.superadminroute}`, {
        resultMessage
      },
        {
          headers: {
            'Authorization': `Bearer ${process.env.token}`, // Añades el token Bearer en el header
          }
        }).catch(error => {
          console.error('No se pudo enviar el post al superadmin', error);
        });
        */

    }

  }
  
  private getChange(html: string): number {
    try {
      const $ = cheerio.load(html);
      const element = $('strong');
      let text = element.text().trim();
      text = text.replace(',', '.');
      const rate = parseFloat(text);

      if (isNaN(rate)) {
        throw new HttpException(
          'La tasa no pudo ser obtenida, posiblemente hubo un cambio en el sitio del BCV, contactar al desarrollador (1)',
          500,
        );
      }

      return rate;

    } catch (error) {
      throw new HttpException("La tasa no pudo ser obtenida, posiblemente hubo un cambio en el sitio del BCV, contactar al desarrollador (2)", 500)
    }
  }


  async test() {
    console.log("running test")
    var resultMessage = {
      "usd": 0,
    };
    try {

      const response = await axios.get(this.url, { timeout: 30000 });
      const $ = cheerio.load(response.data);
      const usdHtml = $('#dolar').html();
      if ((!usdHtml)) { throw new HttpException("La tasa no pudo ser obtenida, posiblemente hubo un cambio en el sitio del BCV, contactar al desarrollador (0)", 500) }
      resultMessage.usd = this.getChange(usdHtml)
      return resultMessage
    } catch (error) {
      return { error }
    }
  }

}
