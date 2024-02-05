/* // SDK do Mercado Pago
import { MercadoPagoConfig } from 'mercadopago';
// Adicione as credenciais
const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKEN' });
 */
const db = require('../database/models');
module.exports = {
    cart: async (req, res) => {
        const { userId } = req
        const {userName, firstName, lastName, email, number} = await db.User.findByPk(userId)
        return res.json({
            userName,
            firstName,
            lastName,
            email,
            number
        })
        // Cria um objeto de preferência
        const preference = new Preference(client);

        preference.create({
            body: {
                items: [
                    {
                        id: 'item-ID-1234',
                        title: 'Meu produto',
                        currency_id: 'BRL',
                        picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
                        description: 'Descrição do Item',
                        category_id: 'art',
                        quantity: 1,
                        unit_price: 75.76
                    }
                ],
                payer: {
                    name: 'João',
                    surname: 'Silva',
                    email: 'user@email.com',
                    phone: {
                        area_code: '11',
                        number: '4444-4444'
                    },
                    identification: {
                        type: 'CPF',
                        number: '19119119100'
                    },
                    address: {
                        street_name: 'Street',
                        street_number: 123,
                        zip_code: '06233200'
                    }
                },
                back_urls: {
                    success: 'https://www.success.com',
                    failure: 'http://www.failure.com',
                    pending: 'http://www.pending.com'
                },
                auto_return: 'approved',
                payment_methods: {
                    excluded_payment_methods: [],
                    excluded_payment_types: [],
                    installments: 1
                },
                notification_url: 'https://www.your-site.com/ipn',
                statement_descriptor: 'MEUNEGOCIO',
                external_reference: 'Reference_1234',
                expires: true,
                expiration_date_from: '2016-02-01T12:00:00.000-04:00',
                expiration_date_to: '2016-02-28T12:00:00.000-04:00'
            }
        }).then(console.log).catch(console.log);;
    }
}