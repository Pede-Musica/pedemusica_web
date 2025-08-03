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
          page: 'requests',
          name: 'Pedidos',
          icon: 'music_note',
          path: '/in/requests',
          needAdmin: false
        },
      ]
    },
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


