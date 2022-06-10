import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {createServer, Model} from 'miragejs';

createServer({

  models: {
    transaction: Model,
  },
  seeds(server){
    server.db.loadData({
      transactions:[
        {
          id: 1,
          title: 'salário do Mês',
          amount: 3000,
          type: 'deposit',
          category: 'Trabalho',
          createdAt: new Date('2021-12-01')
        },
        {
          id: 2,
          title: 'Financiamento da casa',
          amount: 1200,
          type: 'withdraw',
          category: 'Casa',
          createdAt: new Date('2021-12-20')
        }
      ],
    })
  },
  routes(){
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction',data);
    });
  }
});
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
