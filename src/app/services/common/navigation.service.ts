import { Inject, Injectable, signal } from "@angular/core";
import { RegisterService } from "../user/register.service";

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

  public isOpen = signal(false);
  public hasExits = signal(0);

  constructor(
    private _registerService: RegisterService
  ) {}

  public getExits() {
    this._registerService.listExits().subscribe(
      data => {
        this.hasExits.set(data?.length);
      }
    )
  }


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
          name: 'Início',
          icon: 'flag',
          path: '/in/home'
        },
        {
          page: 'track',
          name: 'Pedidos',
          icon: 'edit_square',
          path: '/in/track'
        },
        {
          page: 'table',
          name: 'Mesas',
          icon: 'table_restaurant',
          path: '/in/table'
        },
        {
          page: 'finance',
          name: 'Financeiro',
          icon: 'payments',
          path: '/in/finance'
        },
        {
          page: 'monitoring',
          name: 'Relatórios',
          icon: 'insert_chart',
          path: '/in/monitoring'
        },
      ]
    },
    {
      type: 'Cadastros',
      child: [
        {
          page: 'products',
          name: 'Cardápio',
          icon: 'nature',
          path: '/in/products'
        },
        {
          page: 'users',
          name: 'Usuários',
          icon: 'group',
          path: '/in/users'
        },
        {
          page: 'sectors',
          name: 'Setores',
          icon: 'account_tree',
          path: '/in/sectors'
        },
        {
          page: 'Sistema',
          name: 'Localizações',
          icon: 'flag',
          path: '/in/locations'
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
        {
          page: 'settings',
          name: 'Configurações',
          icon: 'settings',
          path: '/in/setting'
        },
      ]
    } */
  ]
}
