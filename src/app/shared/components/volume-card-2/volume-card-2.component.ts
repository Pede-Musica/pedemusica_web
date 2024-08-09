import { Component, Input } from '@angular/core';
import { DateTime } from '@app/resources/handlers/datetime';
import { Regex } from '@app/resources/handlers/regex';


interface volumeProps {
  id: string
  entry_id: string
  product_name: string
  type: string
  size: string
  amount: number
  volume: number
  volume_type: string
  created_at: string
  Entry: {
    Register: any
    observation: string
    Producer: {
      Person: {
        name: string
      }
    }
    User: {
      Person: {
        name: string
      }
    }
  }
  Product: {
    name: string
  }
  Material: {
    name: string
  }
}


@Component({
  selector: 'app-volume-card-2',
  templateUrl: './volume-card-2.component.html',
  styleUrl: './volume-card-2.component.scss'
})
export class VolumeCard2Component {


  @Input() public volume: volumeProps = {
    id: '',
    entry_id: '',
    product_name: '',
    amount: 0,
    created_at: '',
    size: '',
    type: '',
    volume: 0,
    volume_type: '',
    Entry: {
      Register: {},
      observation: '',
      Producer: {
        Person: {
          name: ''
        }
      },
      User: {
        Person: {
          name: ''
        }
      }
    },
    Material: {
      name: ''
    },
    Product: {
      name: ''
    }
  }

  constructor(
    public regex: Regex,
    public dateTime: DateTime
  ) { }

}
