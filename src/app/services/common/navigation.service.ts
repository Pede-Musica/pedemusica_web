import { Inject, Injectable } from "@angular/core";

interface childProps {
  page: string
  name: string
  icon: string
  path: string
}

interface MenuProps {
  type: string
  child: childProps[]
}

@Injectable({
  providedIn: 'root'
})

export class NavigationService {

  public getPATH(page: string) {

    let obj = '/in/home';

    this.internal.map(i => {
      i.child.map((c: any) => {
        if (page === c.page) {
          obj = c.path;
        }
      })
    })

    return obj;
  }

  public getName(page: string) {

    let obj = '';

    this.internal.map(i => {
      i.child.map((c: any) => {
        if (page === c.page) {
          obj = c.name;
        }
      })
    })

    return obj;
  }

  public getIcon(page: string) {

    let obj = '';

    this.internal.map(i => {
      i.child.map((c: any) => {
        if (page === c.page) {
          obj = c.icon;
        }
      })
    })

    return obj;
  }

  public internal: Array<MenuProps> = [
    {
      type: '',
      child: [
        {
          page: 'home',
          name: 'Rastreabilidade',
          icon: 'account_tree',
          path: '/in/home'
        },
        {
          page: 'movimentation',
          name: 'Entrada e Saída',
          icon: 'repeat',
          path: '/in/movimentation'
        },
        {
          page: 'stock',
          name: 'Estoque',
          icon: 'inventory_2',
          path: '/in/stock'
        },
      ]
    },
    {
      type: 'Cadastros',
      child: [
        {
          page: 'users',
          name: 'Usuários',
          icon: 'group',
          path: '/in/users'
        },
        {
          page: 'producers',
          name: 'Produtores',
          icon: 'compost',
          path: '/in/producers'
        },
        {
          page: 'customers',
          name: 'Clientes',
          icon: 'handshake',
          path: '/in/customers'
        },
        {
          page: 'products',
          name: 'Produtos',
          icon: 'nature',
          path: '/in/products'
        },
        {
          page: 'locations',
          name: 'Localizações',
          icon: 'flag',
          path: '/in/locations'
        },
        {
          page: 'materials',
          name: 'Materiais',
          icon: 'inventory',
          path: '/in/locations'
        },
      ]
    }
  ]
}
