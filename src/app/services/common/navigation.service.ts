import { Inject, Injectable, signal } from "@angular/core";

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

  public isOpen = signal(false)

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
          page: 'track',
          name: 'Rastreabilidade',
          icon: 'account_tree',
          path: '/in/track'
        },
        {
          page: 'register',
          name: 'Registros',
          icon: 'app_registration',
          path: '/in/register'
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
          page: 'persons',
          name: 'Pessoas',
          icon: 'group',
          path: '/in/persons'
        },
        {
          page: 'products',
          name: 'Produtos',
          icon: 'nature',
          path: '/in/products'
        },
        {
          page: 'sectors',
          name: 'Setores',
          icon: 'pin_drop',
          path: '/in/sectors'
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
          path: '/in/materials'
        },
      ]
    },
    /* {
      type: 'Sistema',
      child: [
        {
          page: 'profiles',
          name: 'Perfis',
          icon: 'manage_accounts',
          path: '/in/profiles'
        },
      ]
    } */
  ]
}
