import { Inject, Injectable, signal } from "@angular/core";
import { RegisterService } from "../user/register.service";

interface childProps {
  page: string
  name: string
  icon: string
  path: string,
  needAdmin: boolean
}

interface MenuProps {
  type: string
  child: childProps[],
}

export interface permissionProps {
  type: string
  items: {
    name: string
    code: string
    checked: boolean
  }[]
}

@Injectable({
  providedIn: 'root'
})

export class NavigationService {

  public isOpen = signal(false);
  public hasExits = signal(0);
  public isClientAdmin = signal(false);

  constructor(
    private _registerService: RegisterService
  ) { }

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
          name: 'Home',
          icon: 'home',
          path: '/in/home',
          needAdmin: false
        },
        {
          page: 'track',
          name: 'Pedidos',
          icon: 'edit_square',
          path: '/in/track',
          needAdmin: false
        },
        {
          page: 'table',
          name: 'Mesas',
          icon: 'table_restaurant',
          path: '/in/table',
          needAdmin: false
        }
      ]
    },
    {
      type: 'Cadastros',
      child: [
        {
          page: 'products',
          name: 'Cardápio',
          icon: 'nature',
          path: '/in/products',
          needAdmin: false
        },
        {
          page: 'users',
          name: 'Usuários',
          icon: 'group',
          path: '/in/users',
          needAdmin: true
        },
        {
          page: 'sectors',
          name: 'Setores',
          icon: 'account_tree',
          path: '/in/sectors',
          needAdmin: true
        },
        {
          page: 'Sistema',
          name: 'Localizações',
          icon: 'flag',
          path: '/in/locations',
          needAdmin: true
        },
      ]
    },
    {
      type: 'Sistema',
      child: [
        {
          page: 'finance',
          name: 'Financeiro',
          icon: 'payments',
          path: '/in/finance',
          needAdmin: true
        },
        {
          page: 'monitoring',
          name: 'Relatórios',
          icon: 'insert_chart',
          path: '/in/monitoring',
          needAdmin: true
        }
        // {
        //   page: 'settings',
        //   name: 'Configurações',
        //   icon: 'settings',
        //   path: '/in/setting'
        // }
      ]
    }
  ]


  public permissions: permissionProps[] = [
    {
      type: 'Home',
      items: [
        {
          name: 'Abrir/Fechar loja',
          code: 'H1',
          checked: false
        },
        {
          name: 'Abrir/Fechar delivery',
          code: 'H2',
          checked: false
        }
      ]
    },
    {
      type: 'Pedidos',
      items: [
        {
          name: 'Gerenciar pedidos',
          code: 'O1',
          checked: false
        },
        {
          name: 'Abrir pedido (Web e App)',
          code: 'O2',
          checked: false
        }
      ]
    },
    {
      type: 'Mesas',
      items: [
        {
          name: 'Gerenciar mesas',
          code: 'T1',
          checked: false
        },
      ]
    }
  ]
}


